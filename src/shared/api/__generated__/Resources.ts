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
import { type Resource } from './data-contracts';

export class ResourcesApi extends HttpService {
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesCreate
   * @summary Upload resource(file) to server
   * @request POST:/resources
   * @response `200` `Resource` Ok
   * @response `400` `void` Bad request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
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
      method: Method.Post,
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
   * @response `200` `void` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  resourcesDetail = (path: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/resources/${path}`,
      method: Method.Get,
      ...params,
    });
}
