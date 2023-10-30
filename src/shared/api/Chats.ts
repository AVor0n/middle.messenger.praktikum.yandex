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
  ChatArchiveRequest,
  ChatArchiveResponse,
  ChatDeleteRequest,
  ChatDeleteResponse,
  ChatMessage,
  ChatUserResponse,
  ChatsMessagesTokenResponse,
  ChatsResponse,
  CreateChatRequest,
  HttpErrorBody,
  UnreadCountResponse,
  UsersRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class ChatsApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Chats
   * @name ChatsList
   * @summary Get chats
   * @request GET:/chats
   */
  chatsList = (
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
      /** Chat's title to filter by */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatsResponse[], void>({
      path: `/chats`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name ChatsCreate
   * @summary Create chat
   * @request POST:/chats
   */
  chatsCreate = (createChatRequest: CreateChatRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/chats`,
      method: 'POST',
      body: createChatRequest,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete works only for admin role.
   *
   * @tags Chats
   * @name ChatsDelete
   * @summary Delete chat by ID
   * @request DELETE:/chats
   */
  chatsDelete = (deleteChatRequest: ChatDeleteRequest, params: RequestParams = {}) =>
    this.request<ChatDeleteResponse, void>({
      path: `/chats`,
      method: 'DELETE',
      body: deleteChatRequest,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name FilesDetail
   * @summary Get chat sent files
   * @request GET:/chats/{id}/files
   */
  filesDetail = (id: number, params: RequestParams = {}) =>
    this.request<ChatMessage[], void>({
      path: `/chats/${id}/files`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name ArchiveList
   * @summary Get archived chats
   * @request GET:/chats/archive
   */
  archiveList = (
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
      /** Chat's title to filter by */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatsResponse[], void>({
      path: `/chats/archive`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Archive chat
   *
   * @tags Chats
   * @name ArchiveCreate
   * @summary Archive chat by ID
   * @request POST:/chats/archive
   */
  archiveCreate = (archiveChatRequest: ChatArchiveRequest, params: RequestParams = {}) =>
    this.request<ChatArchiveResponse, void>({
      path: `/chats/archive`,
      method: 'POST',
      body: archiveChatRequest,
      format: 'json',
      ...params,
    });
  /**
   * @description UnArchive chat
   *
   * @tags Chats
   * @name UnarchiveCreate
   * @summary UnArchive chat by ID
   * @request POST:/chats/unarchive
   */
  unarchiveCreate = (unarchiveChatRequest: ChatArchiveRequest, params: RequestParams = {}) =>
    this.request<ChatArchiveResponse, void>({
      path: `/chats/unarchive`,
      method: 'POST',
      body: unarchiveChatRequest,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name CommonDetail
   * @summary Get common chat with current chat user (only works for two users chats)
   * @request GET:/chats/{id}/common
   */
  commonDetail = (id: number, params: RequestParams = {}) =>
    this.request<ChatsResponse[], void>({
      path: `/chats/${id}/common`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name UsersDetail
   * @summary Get chat users
   * @request GET:/chats/{id}/users
   */
  usersDetail = (
    id: number,
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
      /** User's '{first_name} {second_name}' to filter */
      name?: string;
      /** User's email to filter */
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatUserResponse[], void>({
      path: `/chats/${id}/users`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name GetChats
   * @summary Get new messages count
   * @request GET:/chats/new/{id}
   */
  getChats = (id: number, params: RequestParams = {}) =>
    this.request<UnreadCountResponse, void>({
      path: `/chats/new/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name AvatarUpdate
   * @summary Upload chat avatar
   * @request PUT:/chats/avatar
   */
  avatarUpdate = (
    data: {
      /** Chat id */
      chatId: number;
      /**
       * Avatar
       * @format binary
       */
      avatar: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatsResponse, HttpErrorBody | void>({
      path: `/chats/avatar`,
      method: 'PUT',
      body: data,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name UsersUpdate
   * @summary Add users to chat
   * @request PUT:/chats/users
   */
  usersUpdate = (usersRequest: UsersRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/chats/users`,
      method: 'PUT',
      body: usersRequest,
      ...params,
    });
  /**
   * No description
   *
   * @tags Chats
   * @name UsersDelete
   * @summary Delete users from chat
   * @request DELETE:/chats/users
   */
  usersDelete = (usersRequest: UsersRequest, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/chats/users`,
      method: 'DELETE',
      body: usersRequest,
      ...params,
    });
  /**
   * @description Request token to connect to messages server
   *
   * @tags Chats
   * @name TokenCreate
   * @summary Get chat users
   * @request POST:/chats/token/{id}
   */
  tokenCreate = (id: number, params: RequestParams = {}) =>
    this.request<ChatsMessagesTokenResponse[], void>({
      path: `/chats/token/${id}`,
      method: 'POST',
      format: 'json',
      ...params,
    });
}
