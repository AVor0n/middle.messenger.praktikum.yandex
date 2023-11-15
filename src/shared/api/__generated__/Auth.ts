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
import { type SignInRequest, type SignUpRequest, type SignUpResponse, type UserResponse } from './data-contracts';

export class AuthApi extends HttpService {
  /**
   * No description
   *
   * @tags Auth
   * @name SignupCreate
   * @summary Sign up (create user)
   * @request POST:/auth/signup
   * @response `200` `SignUpResponse` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  signupCreate = (signUpRequest: SignUpRequest, params: RequestParams = {}) =>
    this.post<SignUpResponse>({
      path: `/auth/signup`,
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
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  signinCreate = (signInRequest: SignInRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/auth/signin`,
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
   * @response `200` `UserResponse` An array of user info
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  userList = (params: RequestParams = {}) =>
    this.get<UserResponse>({
      path: `/auth/user`,
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
   * @response `200` `void` Ok
   * @response `500` `void` Unexpected error
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.post<void>({
      path: `/auth/logout`,
      ...params,
    });
}
