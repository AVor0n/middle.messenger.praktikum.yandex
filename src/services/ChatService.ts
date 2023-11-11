import { EventBus, onChangeEvent } from '@shared/EventBus';
import {
  ChatsApi,
  type AvatarUpdatePayload,
  type CreateChatRequest,
  type ChatDeleteRequest,
  type ChatsListParams,
  type UsersRequest,
  type UsersDetailParams,
  type ChatsResponse,
  stringifyApiError,
} from '@api';

class ChatService extends EventBus<{
  changeActiveChat: (activeChat?: ChatsResponse) => void;
  chatListUpdate: (chats: ChatsResponse[]) => void;
}> {
  private chatApi = new ChatsApi();

  @onChangeEvent('changeActiveChat')
  public accessor activeChat: ChatsResponse | undefined;

  @onChangeEvent('chatListUpdate')
  private accessor _chatList: ChatsResponse[] | undefined;

  public get chatList() {
    if (!this._chatList) {
      this.getChatsList({})
        .then(chats => {
          this._chatList = chats;
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(`Ошибка при получении списка чатов: ${stringifyApiError(e)}`);
        });
      return [];
    }

    return this._chatList;
  }

  public getChatsList = async (query: ChatsListParams) => {
    this._chatList = await this.chatApi.chatsList(query);
    return this.chatList;
  };

  public getChat = (id: number) => this.chatApi.commonDetail(id);

  public createChat = async (data: CreateChatRequest) => {
    await this.chatApi.chatsCreate(data);
    await this.getChatsList({});
    return this.chatList;
  };

  public deleteChat = (data: ChatDeleteRequest) => this.chatApi.chatsDelete(data);

  public updateAvatar = (data: AvatarUpdatePayload) => this.chatApi.avatarUpdate(data);

  public getCountUnreadMessagesInChat = (id: number) => this.chatApi.getChats(id);

  public getUsersInChat = (data: UsersDetailParams) => this.chatApi.usersDetail(data);

  public addUsersToChat = (data: UsersRequest) => this.chatApi.usersUpdate(data);

  public deleteUsersFromChat = (data: UsersRequest) => this.chatApi.usersDelete(data);
}

export const chatService = new ChatService();
