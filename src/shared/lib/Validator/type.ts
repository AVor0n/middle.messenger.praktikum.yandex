export type Validator = (value: string) => ValidatorResult;

export interface ValidatorResult {
  isValid: boolean;
  error: string;
}
