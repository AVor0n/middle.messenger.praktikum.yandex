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
  type LiveChartRequest,
  type LiveChartResponse,
  type StaticChartRequest,
  type StaticChartResponse,
} from './data-contracts';

export class ChartsApi extends HttpService {
  /**
   * No description
   *
   * @tags Charts
   * @name StaticCreate
   * @request POST:/charts/static
   * @response `200` `StaticChartResponse` Ok
   * @response `400` `void` Bad request (wrong body parameters)
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  staticCreate = (chartSize: StaticChartRequest, params: RequestParams = {}) =>
    this.request<StaticChartResponse, void>({
      path: `/charts/static`,
      method: Method.Post,
      body: chartSize,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Charts
   * @name LiveCreate
   * @request POST:/charts/live
   * @response `200` `LiveChartResponse` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  liveCreate = (next: LiveChartRequest, params: RequestParams = {}) =>
    this.request<LiveChartResponse, void>({
      path: `/charts/live`,
      method: Method.Post,
      body: next,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
