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

import { HttpErrorBody, SignInRequest, SignUpRequest, SignUpResponse, UserResponse } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class AuthApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name SignupCreate
   * @summary Sign up (create user)
   * @request POST:/auth/signup
   */
  signupCreate = (signUpRequest: SignUpRequest, params: RequestParams = {}) =>
    this.request<SignUpResponse, HttpErrorBody | void>({
      path: `/auth/signup`,
      method: 'POST',
      body: signUpRequest,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name SigninCreate
   * @summary Sign in
   * @request POST:/auth/signin
   */
  signinCreate = (signInRequest: SignInRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/auth/signin`,
      method: 'POST',
      body: signInRequest,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name UserList
   * @summary Get user info
   * @request GET:/auth/user
   */
  userList = (params: RequestParams = {}) =>
    this.request<UserResponse, HttpErrorBody | void>({
      path: `/auth/user`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LogoutCreate
   * @summary Logout
   * @request POST:/auth/logout
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/logout`,
      method: 'POST',
      ...params,
    });
}
