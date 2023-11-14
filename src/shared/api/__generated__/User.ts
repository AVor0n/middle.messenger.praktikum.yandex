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
  type ChangePasswordRequest,
  type FindUserRequest,
  type ProfileAvatarUpdatePayload,
  type UserResponse,
  type UserUpdateRequest,
} from './data-contracts';

export class UserApi extends HttpService {
  /**
   * No description
   *
   * @tags Users
   * @name ProfileUpdate
   * @summary Change user profile
   * @request PUT:/user/profile
   * @response `200` `UserResponse` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  profileUpdate = (userRequest: UserUpdateRequest, params: RequestParams = {}) =>
    this.put<UserResponse>({
      path: `/user/profile`,
      body: userRequest,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Users
   * @name ProfileAvatarUpdate
   * @summary Change user avatar
   * @request PUT:/user/profile/avatar
   * @response `200` `UserResponse` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  profileAvatarUpdate = (data: ProfileAvatarUpdatePayload, params: RequestParams = {}) =>
    this.put<UserResponse>({
      path: `/user/profile/avatar`,
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Users
   * @name PasswordUpdate
   * @summary Change user password
   * @request PUT:/user/password
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  passwordUpdate = (changePasswordRequest: ChangePasswordRequest, params: RequestParams = {}) =>
    this.put<void>({
      path: `/user/password`,
      body: changePasswordRequest,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Users
   * @name UserDetail
   * @summary Get user by id
   * @request GET:/user/{id}
   * @response `200` `UserResponse` Ok
   * @response `401` `void` Unauthorized
   * @response `404` `HttpErrorBody` User not found
   * @response `500` `void` Unexpected error
   */
  userDetail = (id: number, params: RequestParams = {}) =>
    this.get<UserResponse>({
      path: `/user/${id}`,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Users
   * @name SearchCreate
   * @summary Search for user by login (max 10)
   * @request POST:/user/search
   * @response `200` `(UserResponse)[]` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  searchCreate = (findUserRequest: FindUserRequest, params: RequestParams = {}) =>
    this.post<UserResponse[]>({
      path: `/user/search`,
      body: findUserRequest,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
