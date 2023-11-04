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

import { ContentType, HttpService, Method, type RequestParams } from '@shared/HttpService';
import {
  type HttpErrorBody,
  type OauthSignInRequest,
  type ServiceId,
  type YandexServiceIdListParams,
} from './data-contracts';

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
    this.request<void, HttpErrorBody | void>({
      path: `/oauth/yandex`,
      method: Method.Post,
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
    this.request<ServiceId, HttpErrorBody | void>({
      path: `/oauth/yandex/service-id`,
      method: Method.Get,
      query: query,
      format: 'json',
      ...params,
    });
}
