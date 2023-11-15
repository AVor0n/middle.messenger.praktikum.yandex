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
  type ArchiveListParams,
  type AvatarUpdatePayload,
  type ChatArchiveRequest,
  type ChatArchiveResponse,
  type ChatDeleteRequest,
  type ChatDeleteResponse,
  type ChatMessage,
  type ChatUserResponse,
  type ChatsListParams,
  type ChatsMessagesTokenResponse,
  type ChatsResponse,
  type CreateChatRequest,
  type UnreadCountResponse,
  type UsersDetailParams,
  type UsersRequest,
} from './data-contracts';

export class ChatsApi extends HttpService {
  /**
   * No description
   *
   * @tags Chats
   * @name ChatsList
   * @summary Get chats
   * @request GET:/chats
   * @response `200` `(ChatsResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  chatsList = (query: ChatsListParams, params: RequestParams = {}) =>
    this.get<ChatsResponse[]>({
      path: `/chats`,
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
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  chatsCreate = (createChatRequest: CreateChatRequest, params: RequestParams = {}) =>
    this.post<void>({
      path: `/chats`,
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
   * @response `200` `ChatDeleteResponse` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Unexpected error
   */
  chatsDelete = (deleteChatRequest: ChatDeleteRequest, params: RequestParams = {}) =>
    this.delete<ChatDeleteResponse>({
      path: `/chats`,
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
   * @response `200` `(ChatMessage)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found chat
   * @response `500` `void` Unexpected error
   */
  filesDetail = (id: number, params: RequestParams = {}) =>
    this.get<ChatMessage[]>({
      path: `/chats/${id}/files`,
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
   * @response `200` `(ChatsResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  archiveList = (query: ArchiveListParams, params: RequestParams = {}) =>
    this.get<ChatsResponse[]>({
      path: `/chats/archive`,
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
   * @response `200` `ChatArchiveResponse` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Unexpected error
   */
  archiveCreate = (archiveChatRequest: ChatArchiveRequest, params: RequestParams = {}) =>
    this.post<ChatArchiveResponse>({
      path: `/chats/archive`,
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
   * @response `200` `ChatArchiveResponse` Ok
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden
   * @response `500` `void` Unexpected error
   */
  unarchiveCreate = (unarchiveChatRequest: ChatArchiveRequest, params: RequestParams = {}) =>
    this.post<ChatArchiveResponse>({
      path: `/chats/unarchive`,
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
   * @response `200` `(ChatsResponse)[]` Ok
   * @response `400` `void` BadRequest
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found chat
   * @response `500` `void` Unexpected error
   */
  commonDetail = (id: number, params: RequestParams = {}) =>
    this.get<ChatsResponse[]>({
      path: `/chats/${id}/common`,
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
   * @response `200` `(ChatUserResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found chat
   * @response `500` `void` Unexpected error
   */
  usersDetail = ({ id, ...query }: UsersDetailParams, params: RequestParams = {}) =>
    this.get<ChatUserResponse[]>({
      path: `/chats/${id}/users`,
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
   * @response `200` `UnreadCountResponse` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  getChats = (id: number, params: RequestParams = {}) =>
    this.get<UnreadCountResponse>({
      path: `/chats/new/${id}`,
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
   * @response `200` `ChatsResponse` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  avatarUpdate = (data: AvatarUpdatePayload, params: RequestParams = {}) =>
    this.put<ChatsResponse>({
      path: `/chats/avatar`,
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
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  usersUpdate = (usersRequest: UsersRequest, params: RequestParams = {}) =>
    this.put<void>({
      path: `/chats/users`,
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
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  usersDelete = (usersRequest: UsersRequest, params: RequestParams = {}) =>
    this.delete<void>({
      path: `/chats/users`,
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
   * @response `200` `(ChatsMessagesTokenResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  tokenCreate = (id: number, params: RequestParams = {}) =>
    this.post<ChatsMessagesTokenResponse[]>({
      path: `/chats/token/${id}`,
      format: 'json',
      ...params,
    });
}
