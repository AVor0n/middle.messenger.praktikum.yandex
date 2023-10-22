import type { METHOD } from './constants';

export type RequestParams = Record<string, string | number | boolean>;

export interface Options {
  method: METHOD;
  params?: RequestParams;
  data?: Record<string, unknown>;
}
