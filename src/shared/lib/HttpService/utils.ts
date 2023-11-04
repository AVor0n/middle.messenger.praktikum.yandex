import { ContentType } from './constants';
import { type QueryParams } from './types';

const encodeQueryParam = (key: string, value: unknown) => {
  const encodedKey = encodeURIComponent(key);
  return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : String(value))}`;
};

const addQueryParam = (query: QueryParams, key: string) => encodeQueryParam(key, query[key]);

const addArrayQueryParam = (query: QueryParams, key: string) => {
  const value = query[key] as unknown[];
  return value.map(v => encodeQueryParam(key, v)).join('&');
};

export const toQueryString = (rawQuery?: QueryParams): string => {
  const query = rawQuery ?? {};
  const keys = Object.keys(query).filter(key => typeof query[key] !== 'undefined');
  return keys
    .map(key => (Array.isArray(query[key]) ? addArrayQueryParam(query, key) : addQueryParam(query, key)))
    .join('&');
};

export const contentFormatters = {
  [ContentType.Json]: (input: unknown) => JSON.stringify(input),
  [ContentType.Text]: (input: unknown) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
  [ContentType.FormData]: (input: unknown) =>
    Object.entries(input ?? {}).reduce((formData, [key, property]) => {
      if (property instanceof Blob) {
        formData.append(key, property);
      } else if (typeof property === 'object' && property !== null) {
        formData.append(key, JSON.stringify(property));
      } else {
        formData.append(key, String(property));
      }
      return formData;
    }, new FormData()),
  [ContentType.UrlEncoded]: (input: unknown) => toQueryString(input as QueryParams),
};
