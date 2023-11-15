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
import { type LeaderboardNewLeaderRequest, type LeaderboardRequest } from './data-contracts';

export class LeaderboardApi extends HttpService {
  /**
   * No description
   *
   * @tags Leaderboard
   * @name LeaderboardCreate
   * @summary Add user to leaderboard
   * @request POST:/leaderboard
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  leaderboardCreate = (leaderboardNewLeaderRequest: LeaderboardNewLeaderRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/leaderboard`,
      body: leaderboardNewLeaderRequest,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Leaderboard
   * @name PostLeaderboard
   * @summary Get all leaderboard
   * @request POST:/leaderboard/all
   * @response `200` `void` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  postLeaderboard = (leaderboardRequest: LeaderboardRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/leaderboard/all`,
      body: leaderboardRequest,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Leaderboard
   * @name LeaderboardCreate2
   * @summary Get team leaderboard
   * @request POST:/leaderboard/{teamName}
   * @originalName leaderboardCreate
   * @duplicate
   * @response `200` `void` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  leaderboardCreate2 = (teamName: string, leaderboardRequest: LeaderboardRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/leaderboard/${teamName}`,
      body: leaderboardRequest,
      type: ContentType.Json,
      ...params,
    });
}
