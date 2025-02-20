/**
 * Joi options
 * @remarks -Joi options
 *
 * @type {object}
 * @param errors - joi errors options
 * @param abbortEarly -  Whether to abort early
 */

interface JoiOptions {
  errors: {
    wrap: {
      label: string;
    };
  };
  abortEarly: boolean;
}

/**
 * Config
 * @remarks -Config object for joi
 *
 * @type {object}
 * @param joiOptions- Joi options
 */

export interface Config {
  joiOptions: JoiOptions;
}
