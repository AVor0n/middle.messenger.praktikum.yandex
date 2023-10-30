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

import { LiveChartRequest, LiveChartResponse, StaticChartRequest, StaticChartResponse } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ChartsApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Charts
   * @name StaticCreate
   * @request POST:/charts/static
   */
  staticCreate = (chartSize: StaticChartRequest, params: RequestParams = {}) =>
    this.request<StaticChartResponse, void>({
      path: `/charts/static`,
      method: 'POST',
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
   */
  liveCreate = (next: LiveChartRequest, params: RequestParams = {}) =>
    this.request<LiveChartResponse, void>({
      path: `/charts/live`,
      method: 'POST',
      body: next,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
