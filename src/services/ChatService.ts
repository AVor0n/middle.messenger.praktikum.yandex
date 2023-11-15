import { EventBus, onChangeEvent } from '@shared/EventBus';
import { toastService } from '@shared/ToastService';
import {
  ChatsApi,
  type AvatarUpdatePayload,
  type CreateChatRequest,
  type ChatsListParams,
  type UsersRequest,
  type UsersDetailParams,
  type ChatsResponse,
  stringifyApiError,
  type ChatsMessagesTokenResponse,
} from '@api';

class ChatService extends EventBus<{
  chatListUpdate: (chats: ChatsResponse[]) => void;
}> {
  private chatApi = new ChatsApi();

  @onChangeEvent('chatListUpdate')
  private accessor _chatList: ChatsResponse[] | undefined;

  public get chatList() {
    if (!this._chatList) {
      this.getChatsList({})
        .then(chats => {
          this._chatList = chats;
        })
        .catch(e => toastService.error({ body: stringifyApiError(e) }));
      return [];
    }

    return this._chatList;
  }

  public getChatsList = async (query: ChatsListParams = {}) => {
    this._chatList = await this.chatApi.chatsList(query);
    return this.chatList;
  };

  public getChat = (id: number) => this.chatApi.commonDetail(id);

  public createChat = async (data: CreateChatRequest) => {
    await this.chatApi.chatsCreate(data);
    await this.getChatsList({});
    return this.chatList;
  };

  public deleteChat = async (chatId: number) => {
    await this.chatApi.chatsDelete({ chatId });
    await this.getChatsList({});
    return this.chatList;
  };

  public updateAvatar = (data: AvatarUpdatePayload) => this.chatApi.avatarUpdate(data);

  public getCountUnreadMessagesInChat = async (id: number) => {
    const data = await this.chatApi.getChats(id);
    return data.unread_count;
  };

  public getUsersInChat = (data: UsersDetailParams) => this.chatApi.usersDetail(data);

  public addUsersToChat = (data: UsersRequest) => this.chatApi.usersUpdate(data);

  public deleteUsersFromChat = (data: UsersRequest) => this.chatApi.usersDelete(data);

  public createToken = async (chatId: number) => {
    const response = await this.chatApi.tokenCreate(chatId);
    // кривой тип в swagger спецификации
    return (response as unknown as ChatsMessagesTokenResponse).token;
  };
}

export const chatService = new ChatService();
