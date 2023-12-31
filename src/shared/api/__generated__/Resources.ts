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
import { type Resource, type ResourcesCreatePayload } from './data-contracts';

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
  resourcesCreate = (data: ResourcesCreatePayload, params: RequestParams = {}) =>
    this.post<Resource>({
      path: `/resources`,
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
    this.get<void>({
      path: `/resources/${path}`,
      ...params,
    });
}
