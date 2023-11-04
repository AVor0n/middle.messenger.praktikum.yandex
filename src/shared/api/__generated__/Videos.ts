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
import { type LiveVideoInfoRequest } from './data-contracts';

export class VideosApi extends HttpService {
  /**
   * @description Get static video stream
   *
   * @tags Videos
   * @name StaticList
   * @request GET:/videos/static
   * @response `206` `void` Partial (with data stream)
   * @response `400` `void` Bad request (wrong range header)
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  staticList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/static`,
      method: Method.Get,
      ...params,
    });

  /**
   * @description Get static full video info (size)
   *
   * @tags Videos
   * @name StaticInfoList
   * @request GET:/videos/static/info
   * @response `200` `void` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  staticInfoList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/static/info`,
      method: Method.Get,
      ...params,
    });

  /**
   * @description Get live video stream (part of the video will depend on the "start" bytes of the range
   *
   * @tags Videos
   * @name LiveList
   * @request GET:/videos/live
   * @response `206` `void` Partial (with data stream)
   * @response `400` `void` Bad request (wrong range header)
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  liveList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/live`,
      method: Method.Get,
      ...params,
    });

  /**
   * @description Get live full video info (size) --- Increases with each request
   *
   * @tags Videos
   * @name LiveInfoCreate
   * @request POST:/videos/live/info
   * @response `200` `void` Ok
   * @response `400` `void` Bad request (wrong body / iteration)
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  liveInfoCreate = (iteration: LiveVideoInfoRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/videos/live/info`,
      method: Method.Post,
      body: iteration,
      type: ContentType.Json,
      ...params,
    });
}
