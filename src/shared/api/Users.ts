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

import {
  ChangePasswordRequest,
  FindUserRequest,
  HttpErrorBody,
  UserResponse,
  UserUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class UsersApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name ProfileUpdate
   * @summary Change user profile
   * @request PUT:/user/profile
   */
  profileUpdate = (userRequest: UserUpdateRequest, params: RequestParams = {}) =>
    this.request<UserResponse, HttpErrorBody | void>({
      path: `/user/profile`,
      method: 'PUT',
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
   */
  profileAvatarUpdate = (
    data: {
      /**
       * Avatar
       * @format binary
       */
      avatar: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserResponse, HttpErrorBody | void>({
      path: `/user/profile/avatar`,
      method: 'PUT',
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
   */
  passwordUpdate = (changePasswordRequest: ChangePasswordRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/user/password`,
      method: 'PUT',
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
   */
  userDetail = (id: number, params: RequestParams = {}) =>
    this.request<UserResponse, void | HttpErrorBody>({
      path: `/user/${id}`,
      method: 'GET',
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
   */
  searchCreate = (findUserRequest: FindUserRequest, params: RequestParams = {}) =>
    this.request<UserResponse[], HttpErrorBody | void>({
      path: `/user/search`,
      method: 'POST',
      body: findUserRequest,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
