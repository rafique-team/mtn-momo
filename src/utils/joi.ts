import * as joi from 'joi';
import { config } from '../config/config';

export function validateJoiSchema(joiSchema: joi.ObjectSchema, paramsToValidate: unknown): string | null {
  const { error } = joiSchema.validate(paramsToValidate, config.joiOptions);

  return error ? error.details[0].message : null;
}
