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
    this.get<void>({
      path: `/videos/static`,
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
    this.get<void>({
      path: `/videos/static/info`,
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
    this.get<void>({
      path: `/videos/live`,
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
    this.post<void>({
      path: `/videos/live/info`,
      body: iteration,
      type: ContentType.Json,
      ...params,
    });
}
