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
    this.post<StaticChartResponse>({
      path: `/charts/static`,
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
    this.post<LiveChartResponse>({
      path: `/charts/live`,
      body: next,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
