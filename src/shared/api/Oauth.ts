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

import { HttpErrorBody, OauthSignInRequest, ServiceId } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class OauthApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Oauth
   * @name YandexCreate
   * @summary Sign in / sign up with yandex
   * @request POST:/oauth/yandex
   */
  yandexCreate = (OauthSignInRequest: OauthSignInRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/oauth/yandex`,
      method: 'POST',
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
   */
  yandexServiceIdList = (
    query?: {
      /** Redirect uri that you are using for oauth */
      redirect_uri?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ServiceId, HttpErrorBody | void>({
      path: `/oauth/yandex/service-id`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
