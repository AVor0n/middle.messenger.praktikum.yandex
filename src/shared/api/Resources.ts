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

import { Resource } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ResourcesApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesCreate
   * @summary Upload resource(file) to server
   * @request POST:/resources
   */
  resourcesCreate = (
    data: {
      /** @format binary */
      resource: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<Resource, void>({
      path: `/resources`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      format: 'formData',
      ...params,
    });
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesDetail
   * @summary Serving static files
   * @request GET:/resources/{path}
   */
  resourcesDetail = (path: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/resources/${path}`,
      method: 'GET',
      ...params,
    });
}
