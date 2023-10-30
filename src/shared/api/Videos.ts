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

import { LiveVideoInfoRequest } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class VideosApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get static video stream
   *
   * @tags Videos
   * @name StaticList
   * @request GET:/videos/static
   */
  staticList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/static`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get static full video info (size)
   *
   * @tags Videos
   * @name StaticInfoList
   * @request GET:/videos/static/info
   */
  staticInfoList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/static/info`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get live video stream (part of the video will depend on the "start" bytes of the range
   *
   * @tags Videos
   * @name LiveList
   * @request GET:/videos/live
   */
  liveList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/live`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get live full video info (size) --- Increases with each request
   *
   * @tags Videos
   * @name LiveInfoCreate
   * @request POST:/videos/live/info
   */
  liveInfoCreate = (iteration: LiveVideoInfoRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/live/info`,
      method: 'POST',
      body: iteration,
      type: ContentType.Json,
      ...params,
    });
}
