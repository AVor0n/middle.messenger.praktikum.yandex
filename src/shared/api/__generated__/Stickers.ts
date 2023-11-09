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
import {
  type FavoriteListParams,
  type HttpErrorBody,
  type StickerPacksResponse,
  type StickersCreate2Payload,
  type StickersCreatePayload,
  type StickersDetailParams,
  type StickersListParams,
  type StickersResponse,
} from './data-contracts';

export class StickersApi extends HttpService {
  /**
   * No description
   *
   * @tags Stickers
   * @name StickersList
   * @summary Get sticker packs
   * @request GET:/stickers
   * @response `200` `(StickerPacksResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  stickersList = (query: StickersListParams, params: RequestParams = {}) =>
    this.request<StickerPacksResponse[], void>({
      path: `/stickers`,
      method: Method.Get,
      query: query,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name StickersCreate
   * @summary Create sticker pack
   * @request POST:/stickers
   * @response `201` `void` Created
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  stickersCreate = (data: StickersCreatePayload, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/stickers`,
      method: Method.Post,
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name StickersDetail
   * @summary Get stickers from pack
   * @request GET:/stickers/{id}/
   * @response `200` `(StickersResponse)[]` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  stickersDetail = ({ id, ...query }: StickersDetailParams, params: RequestParams = {}) =>
    this.request<StickersResponse[], void>({
      path: `/stickers/${id}/`,
      method: Method.Get,
      query: query,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name StickersCreate2
   * @summary Add more stickers (images) to the pack
   * @request POST:/stickers/{id}/
   * @originalName stickersCreate
   * @duplicate
   * @response `200` `void` Ok
   * @response `400` `HttpErrorBody` Bad Request
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  stickersCreate2 = (id: number, data: StickersCreate2Payload, params: RequestParams = {}) =>
    this.request<void, HttpErrorBody | void>({
      path: `/stickers/${id}/`,
      method: Method.Post,
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name FavoriteList
   * @summary Get user's favorite sticker packs
   * @request GET:/stickers/favorite
   * @response `200` `StickerPacksResponse` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  favoriteList = (query: FavoriteListParams, params: RequestParams = {}) =>
    this.request<StickerPacksResponse, void>({
      path: `/stickers/favorite`,
      method: Method.Get,
      query: query,
      format: 'json',
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name FavoriteCreate
   * @summary Add pack to favorites
   * @request POST:/stickers/{id}/favorite
   * @response `200` `void` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  favoriteCreate = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/stickers/${id}/favorite`,
      method: Method.Post,
      ...params,
    });

  /**
   * No description
   *
   * @tags Stickers
   * @name FavoriteDelete
   * @summary Remove pack from favorites
   * @request DELETE:/stickers/{id}/favorite
   * @response `200` `void` Ok
   * @response `401` `void` Unauthorized
   * @response `500` `void` Unexpected error
   */
  favoriteDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/stickers/${id}/favorite`,
      method: Method.Delete,
      ...params,
    });
}
