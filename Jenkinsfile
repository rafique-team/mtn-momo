/**
 * User uuids correlation:
 * Matteo Artuso: {4097cad2-90f2-4d67-b01d-2ac68ddd364d}
 * Prashanth Shanmuganathan: {fc8915e3-311f-4f6d-92c3-d6a5de9a2e8f}
 * Jaheda Begum: {39e788ef-3522-44b3-b64c-a570113f26db}
 * Anton Makarov: {a8d270c8-ae1c-468c-9a25-f2fd69e8b317}
 * Marco Fraccaro: {e5a2dae8-6340-4080-bfd0-daa327fe7514}
 * Jakob Thrane: {9a5df976-ef9a-4f31-9158-dbb906ba24da}
 * Rasmus Bonnevie: {450fcf39-91a2-46a9-9bc7-4f0424e539f3}
 * Albert Llebaria: {e8593b4a-6eb9-441e-b321-2ce136382482}
 * Andrii Hulak: {ba6bb4f3-eb0b-4460-bb98-168c27c3f4dd}
 * Umbert Pensato: {c258dd19-be1c-4d72-abab-eedb8c7f2325}
 * Illia Shyrokykh: {0af8d8a9-33dc-44f9-bf62-90a4bc7e9942}
 * Dmitriy Bondarchuk: {1b3cff6e-230e-402e-b14b-de0f0ed3bf87}
 * Mario Coloma: {3a69b4ff-9cd4-470f-859e-807ea5fe586a}
 */



pipeline {
  agent {
    kubernetes {
      yamlFile 'jenkins-kubernetes.yaml'
      retries 2
    }
  }
  environment {
    SERVICE_NAME = 'mtn'
    DOCKER_REGISTRY = '185501210650.dkr.ecr.eu-west-1.amazonaws.com'
    REPORTS_DIRECTORY = '/shared-folder/reports'
  }
  options {
    parallelsAlwaysFailFast()
    ansiColor('xterm')
  }
  stages {
    stage('Notify Bitbucket - Start') {
      steps {
        bitbucketStatusNotify(buildState: 'INPROGRESS')
      }
    }
    stage('Environment setup') {
      steps {
        container('nodejs') {
          sshagent(credentials: ['bitbucket-jenkins']) {
            sh 'npm ci'
            sh "mkdir -p ${REPORTS_DIRECTORY}"
            sh "mkdir -p ${REPORTS_DIRECTORY}/coverage"
            sh "mkdir -p ${REPORTS_DIRECTORY}/eslint"
            sh "mkdir -p ${REPORTS_DIRECTORY}/owasp"
            sh "mkdir -p ${env.WORKSPACE}/reports"
          }
        }
      }
    }
    stage('Generate reports') {
      parallel {
        stage('Test') {
          steps {
            container('nodejs') {
              script {
                sh "npm test -- --coverage --coverageDirectory ${REPORTS_DIRECTORY}/coverage --ci --reporters=jest-junit --reporters=default"
                sh "cp ${REPORTS_DIRECTORY}/coverage/cobertura-coverage.xml ${env.WORKSPACE}/reports/cobertura-coverage.xml"
                def junit = scanForIssues tool: junitParser(name:"junit", pattern: "**/junit.xml")
                publishIssues issues: [junit], trendChartType: 'AGGREGATION_ONLY'
              }
            }
          }
          post {
            always {
              publishCoverage adapters: [cobertura(path: '**/cobertura-coverage.xml', mergeToOneReport: true)]
            }
          }
        }
        stage('ESLint') {
          steps {
            container('nodejs') {
              script {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                  sh "npm run eslint -- -o ${REPORTS_DIRECTORY}/eslint/checkstyle-result.xml -f checkstyle"
                }
                sh "cp ${REPORTS_DIRECTORY}/eslint/checkstyle-result.xml ${env.WORKSPACE}/reports/checkstyle-result.xml"

                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                  sh "npm run eslint -- -o ${REPORTS_DIRECTORY}/eslint/report.json -f json"
                }
                sh "cp ${REPORTS_DIRECTORY}/eslint/report.json ${env.WORKSPACE}/reports/report.json"
                def checkstyle = scanForIssues tool: checkStyle(name:"eslint", pattern: "**/checkstyle-result.xml")
                publishIssues issues: [checkstyle], trendChartType: 'AGGREGATION_ONLY'
              }
            }
          }
        }
        stage('Build') {
          steps {
            container('nodejs') {
              script {
                sh 'npm run build'
              }
            }
          }
        }
      }
    }
    stage('Vulnerabilities scan') {
      when {
        branch 'dev'
      }
      steps {
        container('deploy-toolbox') {
          script {
            stage("Report Generation") {
              sh "curl -o html.tpl https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl"
              sh "trivy fs --scanners vuln,config,secret,license --format json --output ${REPORTS_DIRECTORY}/trivy.json ."

              sh "trivy sonarqube ${REPORTS_DIRECTORY}/trivy.json -- filePath=package.json > ${REPORTS_DIRECTORY}/trivy-sonarqube.json"
              sh "trivy convert --format cyclonedx --output ${REPORTS_DIRECTORY}/sbom.cydx.json ${REPORTS_DIRECTORY}/trivy.json"
              sh "trivy convert --format template --template \"@html.tpl\" --output ${REPORTS_DIRECTORY}/trivy_report.html ${REPORTS_DIRECTORY}/trivy.json"

              sh "cp ${REPORTS_DIRECTORY}/sbom.cydx.json ${env.WORKSPACE}/reports/sbom.cydx.json"
              sh "cp ${REPORTS_DIRECTORY}/trivy_report.html ${env.WORKSPACE}/reports/trivy_report.html"
              sh "cp ${REPORTS_DIRECTORY}/trivy.json ${env.WORKSPACE}/reports/trivy.json"

              def trivy = scanForIssues tool: trivy(name: "trivy", pattern: "**/trivy.json")
              publishIssues issues: [trivy], trendChartType: 'AGGREGATION_ONLY'
            }
          }
        }
      }
      post {
        always {
          archiveArtifacts artifacts: 'reports/sbom.cydx.json', fingerprint: true
          archiveArtifacts artifacts: "reports/trivy_report.html", fingerprint: true
        }
      }
    }
    stage('SonarQube Analysis') {
      when {
        branch 'dev'
      }
      steps {
        container('sonar-scanner-cli') {
          withSonarQubeEnv('Unumed SonarQube') {
            sh """sonar-scanner \\
            -Dsonar.projectVersion=${GIT_COMMIT} \\
            -Dsonar.javascript.lcov.reportPaths=${REPORTS_DIRECTORY}/coverage/lcov.info \\
            -Dsonar.eslint.reportPaths=${REPORTS_DIRECTORY}/eslint/report.json \\
            -Dsonar.externalIssuesReportPaths=${REPORTS_DIRECTORY}/trivy-sonarqube.json \\
            """
          }
        }
      }
    }
    stage("Quality Gate") {
      when {
        branch 'dev'
      }
      steps {
        script {
          timeout(time: 8, unit: 'MINUTES') { // Just in case something goes wrong, pipeline will be killed after a timeout
            def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
            if (qg.status != 'OK') {
              unstable(message: "${STAGE_NAME} is unstable due to gate status: ${qg.status}")
            }
          }
        }
      }
    }
  }
  post {
    failure {
      bitbucketStatusNotify(buildState: 'FAILED')
    }
    success {
      bitbucketStatusNotify(buildState: 'SUCCESSFUL')
    }
    unstable {
      bitbucketStatusNotify(buildState: 'SUCCESSFUL')
    }
    aborted {
      bitbucketStatusNotify(buildState: 'FAILED')
    }
  }
}
