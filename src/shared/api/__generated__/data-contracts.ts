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

/** @example {"id":123,"first_name":"Petya","second_name":"Pupkin","display_name":"Petya Pupkin","phone":"+79001001100","login":"userLogin","avatar":"/path/to/avatar.jpg","email":"string@ya.ru"} */
export interface UserResponse {
  /** User id */
  id: number;
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** Display name */
  display_name: string;
  /** User login - unique */
  login: string;
  /**
   * User email - unique
   * @format email
   */
  email: string;
  /** User phone */
  phone: string;
  /** Avatar */
  avatar: string;
}

export interface SignUpRequest {
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** User login - unique */
  login: string;
  /** Email /^\S+@\S+$/ */
  email: string;
  /** Password */
  password: string;
  /** Phone /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ */
  phone: string;
}

export interface SignInRequest {
  /** User login */
  login: string;
  /** Password */
  password: string;
}

export interface SignUpResponse {
  /** Created User ID */
  id: number;
}

export interface CreateChatRequest {
  /** Chat title */
  title: string;
}

export interface UsersRequest {
  users: number[];
  /** Chat id */
  chatId: number;
}

/** @example {"id":123,"title":"my-chat","avatar":"/123/avatar1.jpg","unread_count":15,"created_by":12345,"last_message":{"user":{"first_name":"Petya","second_name":"Pupkin","avatar":"/path/to/avatar.jpg","email":"my@email.com","login":"userLogin","phone":"8(911)-222-33-22"},"time":"2020-01-02T14:22:22.000Z","content":"this is message content"}} */
export interface ChatsResponse {
  /** Chat id */
  id: number;
  /** Chat title */
  title: string;
  /** Chat avatar */
  avatar: string;
  /** Number of unread messages in chat for current user */
  unread_count: number;
  last_message: {
    /**
     * Message user (sender)
     * @format date-time
     */
    user?: UserResponse;
    /**
     * Message timestamp
     * @format timestamp
     */
    time?: string;
    /** Message content */
    content?: string;
  };
}

export interface ChatDeleteRequest {
  /** Chat id */
  chatId: number;
}

/** @example {"userId":12,"result":{"id":123,"title":"deleted-chat","avatar":"/123/avatar1.jpg","created_by":12345}} */
export interface ChatDeleteResponse {
  /** User id */
  userId: number;
  result: ChatsResponse;
}

export interface ChatArchiveRequest {
  /** Chat id */
  chatId: number;
}

export interface ChatArchiveResponse {
  /** User id */
  userId: number;
  result: ChatsResponse;
}

export interface ChatsMessagesTokenResponse {
  /** Token for web socket server */
  token: string;
}

/** @example {"unread_count":12} */
export interface UnreadCountResponse {
  /** New messages count */
  unread_count: number;
}

export interface LeaderboardNewLeaderRequest {
  /** Leaderboard data object, any type */
  data: object;
  /** Which field is used to sort (if new value of the field more than old, data is stored) */
  ratingFieldName: string;
  /** Your team name. Used to make unique leaderboard for each project. */
  teamName?: string;
}

export interface LeaderboardRequest {
  /** Which field is used to sort */
  ratingFieldName: string;
  /** Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10. */
  cursor: number;
  /** Maximum amount of leaders to return */
  limit: number;
}

export interface OauthSignInRequest {
  /** User code from Yandex */
  code: string;
  /** Redirect uri that you are using for oauth */
  redirect_uri: string;
}

export interface ServiceId {
  /** Service id */
  service_id: string;
}

export interface HttpErrorBody {
  /** Error message */
  reason: string;
}

export interface UserUpdateRequest {
  /** First name */
  first_name?: string;
  /** Second name */
  second_name?: string;
  /** Display Name */
  display_name?: string;
  /** User login - unique */
  login?: string;
  /** Email */
  email?: string;
  /** Phone */
  phone?: string;
}

export interface UserRequest {
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** Display Name */
  display_name: string;
  /** User login - unique */
  login: string;
  /** Email */
  email: string;
  /** Phone */
  phone: string;
}

export interface FindUserRequest {
  /** User login (beginning of login) */
  login: string;
}

export interface ChangePasswordRequest {
  /** Old password */
  oldPassword: string;
  /** New password */
  newPassword: string;
}

/** @example {"id":123,"user_id":231,"path":"/32543654dsf/434534r3rsddfs_my-file.jpg","filename":"my-file.jpg","content_type":"image/jpeg","content_size":543672,"upload_date":"2020-01-02T14:22:22.000Z"} */
export interface Resource {
  /** Message id */
  id: number;
  /** User id */
  user_id: number;
  /** Server relative file path */
  path: string;
  /** Initial file name */
  filename: string;
  /** File content type (e.g "image/jpeg" for .jpg images) */
  content_type: string;
  /** File size in bytes */
  content_size: number;
  /**
   * Resource uploading time
   * @format date-time
   */
  upload_date: string;
}

/** @example {"id":123,"user_id":231,"chat_id":312,"time":"2020-01-02T14:22:22.000Z","type":"file","content":132,"file":{"id":132,"user_id":231,"path":"/32543654dsf/434534r3rsddfs_my-file.jpg","filename":"my-file.jpg","content_type":"image/jpeg","content_size":543672,"upload_date":"2020-01-02T14:22:22.000Z"}} */
export interface ChatMessage {
  /** Message id */
  id: number;
  /** User id */
  user_id: number;
  /** Chat id */
  chat_id: number;
  /**
   * Message sent time
   * @format date-time
   */
  time: string;
  /** Message type */
  type: ChatMessageTypeEnum;
  /** Message content (message text for messages and resourceId for files) */
  content: string;
  /** File */
  file?: Resource;
}

/** @example {"id":123,"first_name":"petya","second_name":"petrov","display_name":"petya petrov","login":"my-login","avatar":"/path/to/my-file.jpg","role":"admin"} */
export interface ChatUserResponse {
  /** User id */
  id: number;
  /** First name */
  first_name: string;
  /** Second name */
  second_name: string;
  /** Display name */
  display_name: string;
  /** User login - unique */
  login: string;
  /** Avatar */
  avatar: string;
  /** User role */
  role: ChatUserResponseRoleEnum;
}

export interface StaticChartRequest {
  /** Number of points in chart (10 / 100 / 1000) */
  chartSize: StaticChartRequestChartSizeEnum;
}

export interface LiveChartRequest {
  /**
   * Works as a cursor (initial value should be zero, all the next values are taken from the backend response)
   * @format integer
   * @default 0
   */
  next: number;
}

export type ChartSchema = {
  /**
   * X axis (datetime)
   * @format date-time
   */
  x?: string;
  /** @format float */
  y1?: number;
  /** @format float */
  y2?: number;
}[];

export interface StaticChartResponse {
  /** Chart points */
  data?: ChartSchema;
}

export interface LiveChartResponse {
  /**
   * Used as a cursor (pass this value to the next request)
   * @example 5
   */
  next?: number;
  /** Chart points */
  data?: ChartSchema;
}

export interface LiveVideoInfoRequest {
  /**
   * Works as a cursor (iterate + 1 each request)
   * @format integer
   * @default 0
   */
  iteration: number;
}

export interface VideoInfoResponse {
  /**
   * Video size in bytes
   * @format integer
   * @example 4096
   */
  size: number;
}

export interface Sticker {
  /**
   * Sticker id (send to chat with WS)
   * @format integer
   * @example 123
   */
  id?: number;
  /**
   * Url for sticker resource(image)
   * @example "/stickers/2346-dfsg-425-sdfs/14534.gif"
   */
  path?: string;
}

export interface StickerPack {
  /**
   * Sticker pack title
   * @example "pack-title"
   */
  title?: string;
  /**
   * User id that created this pack
   * @format integer
   * @example 123
   */
  user_id?: number;
  stickers?: string[];
}

export interface StickerPacksResponse {
  /** StickerPacks */
  data?: StickerPack[];
}

export interface StickersResponse {
  /** Stickers */
  data?: Sticker[];
}

/** Message type */
export enum ChatMessageTypeEnum {
  Message = 'message',
  File = 'file',
}

/** User role */
export enum ChatUserResponseRoleEnum {
  Admin = 'admin',
  Regular = 'regular',
}

/** Number of points in chart (10 / 100 / 1000) */
export enum StaticChartRequestChartSizeEnum {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface ChatsListParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Chat's title to filter by */
  title?: string;
}

export interface ArchiveListParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Chat's title to filter by */
  title?: string;
}

export interface UsersDetailParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** User's '{first_name} {second_name}' to filter */
  name?: string;
  /** User's email to filter */
  email?: string;
  /** Numeric chat id */
  id: number;
}

export interface AvatarUpdatePayload {
  /** Chat id */
  chatId: number;
  /**
   * Avatar
   * @format binary
   */
  avatar: File;
}

export interface YandexServiceIdListParams {
  /** Redirect uri that you are using for oauth */
  redirect_uri?: string;
}

export interface ProfileAvatarUpdatePayload {
  /**
   * Avatar
   * @format binary
   */
  avatar: File;
}

export interface ResourcesCreatePayload {
  /** @format binary */
  resource: File;
}

export interface StickersListParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Sticker's title to filter by */
  title?: string;
}

export interface StickersCreatePayload {
  /** Sticker pack title */
  title: string;
  /**
   * Sticker image (can be multiple images, just attach multiple files)
   * @format binary
   */
  resource: File;
}

export interface StickersDetailParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Numeric sticker pack id */
  id: number;
}

export interface StickersCreate2Payload {
  /** Sticker image (can be multiple images, just attach multiple files) */
  resource: File;
}

export interface FavoriteListParams {
  /** The number of items to skip before starting to collect the result set */
  offset?: number;
  /** The numbers of items to return */
  limit?: number;
  /** Sticker pack title to filter by */
  title?: string;
}
