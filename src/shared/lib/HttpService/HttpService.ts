import { METHOD } from './constants';
import type { Options, RequestParams } from './types';

export const httpService = {
  request<Res>(
    url: string,
    options: Options = {
      method: METHOD.GET,
    },
  ): Promise<Res> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (options.method === METHOD.GET) {
        const queryString = Object.entries(options.params ?? {})
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        xhr.open('GET', url + (queryString ? `?${queryString}` : ''));
      } else {
        xhr.open(options.method, url);
      }

      if (options.method !== METHOD.GET && options.data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response as Res);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      };

      const handleError = (err: unknown) => {
        // eslint-disable-next-line no-console
        console.error(err);
        reject(new Error(`Request failed`));
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (options.method === METHOD.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(options.data));
      }
    });
  },
  get<Res>(url: string, params: RequestParams = {}): Promise<Res> {
    return this.request(url, { method: METHOD.GET, params });
  },
  post<Res>(url: string, data: Record<string, unknown> = {}): Promise<Res> {
    return this.request(url, { method: METHOD.POST, data });
  },
  put<Res>(url: string, data: Record<string, unknown> = {}): Promise<Res> {
    return this.request(url, { method: METHOD.PUT, data });
  },
  delete<Res>(url: string): Promise<Res> {
    return this.request(url, { method: METHOD.DELETE });
  },
};
