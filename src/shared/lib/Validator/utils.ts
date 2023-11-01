import type { Validator, ValidatorResult } from './type';

export const validate = (value: string, ...validators: Validator[]): ValidatorResult => {
  for (const validator of validators) {
    const { isValid, error } = validator(value);
    if (!isValid) {
      return {
        isValid,
        error,
      };
    }
  }
  return {
    isValid: true,
    error: '',
  };
};
