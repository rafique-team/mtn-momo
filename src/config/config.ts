import { Config } from '../interfaces/joi';

/**
 * Configuration object for Joi validation.
 *
 * @typedef {Object} Config
 * @property {Object} joiOptions - Options object for Joi validation.
 * @property {Object} joiOptions.errors - Configuration for error handling.
 * @property {Object} joiOptions.errors.wrap - Configuration for wrapping errors.
 * @property {string} joiOptions.errors.wrap.label - Label to be used when wrapping errors.
 * @property {boolean} abortEarly - Whether to abort validation on the first error encountered.
 *
 * @example
 * const config: Config = {
 *   joiOptions: {
 *     errors: {
 *       wrap: { label: '' },
 *     },
 *     abortEarly: true,
 *   },
 * };
 *
 * @description
 * The `abortEarly` option determines whether Joi validation should stop on the first encountered error.
 * Setting it to `true` will stop validation on the first error, while setting it to `false` will continue
 * validation and collect all errors. The `error wrap` feature is configured with an empty label, which means
 * errors won't be wrapped with a label.
 */
export const config: Config = {
  joiOptions: {
    errors: {
      wrap: { label: '' },
    },
    abortEarly: true,
  },
};
