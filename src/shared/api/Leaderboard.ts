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

import { HttpErrorBody, LeaderboardNewLeaderRequest, LeaderboardRequest } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class LeaderboardApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Leaderboard
   * @name LeaderboardCreate
   * @summary Add user to leaderboard
   * @request POST:/leaderboard
   */
  leaderboardCreate = (leaderboardNewLeaderRequest: LeaderboardNewLeaderRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/leaderboard`,
      method: 'POST',
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
   */
  postLeaderboard = (leaderboardRequest: LeaderboardRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/leaderboard/all`,
      method: 'POST',
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
   */
  leaderboardCreate2 = (teamName: string, leaderboardRequest: LeaderboardRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/leaderboard/${teamName}`,
      method: 'POST',
      body: leaderboardRequest,
      type: ContentType.Json,
      ...params,
    });
}
