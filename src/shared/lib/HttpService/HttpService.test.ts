/* eslint-disable @typescript-eslint/no-floating-promises */
import { expect } from 'chai';
import sinon, { type SinonFakeXMLHttpRequest, type SinonFakeXMLHttpRequestStatic } from 'sinon';
import { baseUrl } from './constants.ts';
import { HttpService } from './HttpService.ts';
import { type FullRequestParams, type HTTPMethod } from './types.ts';

// Добавляет public обертки над protected методами
class TestHTTPService extends HttpService {
  publicRequest<T>(params: FullRequestParams) {
    return this.request<T>(params);
  }

  publicGet<T>(...params: Parameters<HTTPMethod>) {
    return this.get<T>(...params);
  }

  publicPost<T>(...params: Parameters<HTTPMethod>) {
    return this.post<T>(...params);
  }

  publicPut<T>(...params: Parameters<HTTPMethod>) {
    return this.put<T>(...params);
  }

  publicDelete<T>(...params: Parameters<HTTPMethod>) {
    return this.delete<T>(...params);
  }
}

describe('HttpService', () => {
  let httpService: TestHTTPService;
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];
  const path = '/test';

  beforeEach(() => {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = req => requests.push(req);

    httpService = new TestHTTPService();
  });

  afterEach(() => xhr.restore());

  describe('get', () => {
    it('отправляет запрос с методом GET', () => {
      httpService.publicGet({ path });

      expect(requests.length).to.be.equal(1);
      expect(requests[0].method).to.be.equal('GET');
    });

    describe('сериализует query параметры при отправке', () => {
      it('number', () => {
        httpService.publicGet({ path, query: { num2: 25, num0: 0, num1: -1 } });
        expect(requests[0].url).to.be.equal(`${baseUrl}${path}?num2=25&num0=0&num1=-1`);
      });
      it('string', () => {
        httpService.publicGet({ path, query: { str: 'str', str2: 'test' } });
        expect(requests[0].url).to.be.equal(`${baseUrl}${path}?str=str&str2=test`);
      });
      it('boolean', () => {
        httpService.publicGet({ path, query: { t: true, f: false } });
        expect(requests[0].url).to.be.equal(`${baseUrl}${path}?t=true&f=false`);
      });
      it('array', () => {
        httpService.publicGet({ path, query: { arr: [1, '2', false] } });
        expect(requests[0].url).to.be.equal(`${baseUrl}${path}?arr=1&arr=2&arr=false`);
      });
    });
  });

  describe('post', () => {
    it('отправляет запрос с методом POST', () => {
      httpService.publicPost({ path });

      expect(requests.length).to.be.equal(1);
      expect(requests[0].method).to.be.equal('POST');
    });

    it('сериализует тело запроса', () => {
      const body = { str: '1', num: 2, bool: false, arr: [1, '2', true] };
      httpService.publicPost({ path, body });

      expect(requests[0].requestBody).to.be.equal(JSON.stringify(body));
    });

    it('десериализует ответ', async () => {
      const expectedResponse = {
        test: { num: 1 },
        str: 'asd',
      };

      const requestPromise = httpService.publicPost({ path, format: 'json' });
      const request = requests[0];
      request.status = 200;
      request.setResponseHeaders({});
      request.setResponseBody(JSON.stringify(expectedResponse));

      const response = await requestPromise;
      expect(response).to.be.deep.equal(expectedResponse);
    });
  });

  describe('put', () => {
    it('отправляет запрос с методом PUT', () => {
      httpService.publicPut({ path });

      expect(requests.length).to.be.equal(1);
      expect(requests[0].method).to.be.equal('PUT');
    });
  });

  describe('delete', () => {
    it('отправляет запрос с методом DELETE', () => {
      httpService.publicDelete({ path });

      expect(requests.length).to.be.equal(1);
      expect(requests[0].method).to.be.equal('DELETE');
    });
  });
});
