import { type Method, type ContentType } from './constants';

// Если использовать unknown, то в Api-классах будет ругаться на то,
// что объект с фиксированным набором ключей, не имеет индексной сигнатуры для string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryParams = Record<string, any>;

export type ResponseFormat = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  method: Method;
  path: string;
  query?: QueryParams;
  type?: ContentType;
  format?: ResponseFormat;
  body?: unknown;
}

export type RequestParams = Omit<RequestInit, 'body' | 'method' | 'query' | 'path'>;
