/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpService, type RequestParams } from '@shared/HttpService';
import { type OauthSignInRequest, type ServiceId, type YandexServiceIdListParams } from './data-contracts';

export class OauthApi extends HttpService {
  /**
   * No description
   *
   * @tags Oauth
   * @name YandexCreate
   * @summary Sign in / sign up with yandex
   * @request POST:/oauth/yandex
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request (No such redirect_uri or wrong code)
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  yandexCreate = (OauthSignInRequest: OauthSignInRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/oauth/yandex`,
      body: OauthSignInRequest,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Oauth
   * @name YandexServiceIdList
   * @summary Get service id
   * @request GET:/oauth/yandex/service-id
   * @response `200` `ServiceId` Yandex client id
   * @response `400` `HttpErrorBody` Bad Request (No such redirect_uri refistered)
   * @response `500` `void` Unexpected error
   */
  yandexServiceIdList = (query: YandexServiceIdListParams, params: RequestParams = {}) =>
    this.get<ServiceId>({
      path: `/oauth/yandex/service-id`,
      query: query,
      format: 'json',
      ...params,
    });
}
