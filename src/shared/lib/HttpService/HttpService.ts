import { ContentType, Method } from './constants';
import { type FullRequestParams, type RequestParams } from './types';
import { contentFormatters, toQueryString } from './utils';

export class HttpService {
  readonly baseUrl = 'https://ya-praktikum.tech/api/v2';

  protected baseApiParams: RequestParams = {
    credentials: 'include',
    mode: 'cors',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  protected request = async <T = unknown, E = unknown>({
    body,
    path,
    type,
    query,
    format,
    method = Method.Get,
    ...params
  }: FullRequestParams): Promise<T> => {
    const queryString = query ? `?${toQueryString(query)}` : '';

    const url = `${this.baseUrl}${path}${queryString}`;

    const requestBody = body !== undefined ? contentFormatters[type ?? ContentType.Json](body) : undefined;

    const requestParams = {
      ...this.baseApiParams,
      ...params,
      headers: {
        ...(this.baseApiParams.headers ?? {}),
        ...(params.headers ?? {}),
        ...(type === ContentType.FormData ? {} : { 'Content-Type': type ?? ContentType.Json }),
      },
    };

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method, url);

      Object.entries(requestParams.headers).forEach(([headerName, headerValue]) => {
        xhr.setRequestHeader(headerName, String(headerValue));
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (format === 'json') {
            resolve(JSON.parse(String(xhr.response)) as T);
          } else {
            resolve(xhr.response as T);
          }
        } else {
          try {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(JSON.parse(String(xhr.response)) as E);
          } catch {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(xhr.response as E);
          }
        }
      };

      const handleError = (err: unknown) => {
        reject(new Error(`Request failed`, { cause: err }));
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;
      xhr.send(requestBody);
    });
  };
}
