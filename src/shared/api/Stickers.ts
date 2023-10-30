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

import { HttpErrorBody, StickerPacksResponse, StickersResponse } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class StickersApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Stickers
   * @name StickersList
   * @summary Get sticker packs
   * @request GET:/stickers
   */
  stickersList = (
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
      /** Sticker's title to filter by */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<StickerPacksResponse[], void>({
      path: `/stickers`,
      method: 'GET',
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
   */
  stickersCreate = (
    data: {
      /** Sticker pack title */
      title: string;
      /**
       * Sticker image (can be multiple images, just attach multiple files)
       * @format binary
       */
      resource: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, HttpErrorBody | void>({
      path: `/stickers`,
      method: 'POST',
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
   */
  stickersDetail = (
    id: number,
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<StickersResponse[], void>({
      path: `/stickers/${id}/`,
      method: 'GET',
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
   */
  stickersCreate2 = (
    id: number,
    data: {
      /** Sticker image (can be multiple images, just attach multiple files) */
      resource: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, HttpErrorBody | void>({
      path: `/stickers/${id}/`,
      method: 'POST',
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
   */
  favoriteList = (
    query?: {
      /** The number of items to skip before starting to collect the result set */
      offset?: number;
      /** The numbers of items to return */
      limit?: number;
      /** Sticker pack title to filter by */
      title?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<StickerPacksResponse, void>({
      path: `/stickers/favorite`,
      method: 'GET',
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
   */
  favoriteCreate = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/stickers/${id}/favorite`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags Stickers
   * @name FavoriteDelete
   * @summary Remove pack from favorites
   * @request DELETE:/stickers/{id}/favorite
   */
  favoriteDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/stickers/${id}/favorite`,
      method: 'DELETE',
      ...params,
    });
}
