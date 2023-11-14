import { toastService } from '@shared/ToastService';
import { authService } from './AuthService';
import { chatService } from './ChatService';

interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
}

class MessageService {
  private sockets: Record<string, WebSocket | undefined> = {};

  public async init() {
    const chats = await chatService.getChatsList({});
    const userId = authService.userInfo?.id;
    for await (const chat of chats) {
      const token = await chatService.createToken(chat.id);
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${token}`);

      socket.addEventListener('close', event => {
        if (!event.wasClean) {
          toastService.error({ body: `Обрыв соединения для чата ${chat.id}` });
        }
        toastService.error({ title: `Ошибка ${event.code}`, body: event.reason });
      });

      this.sockets[chat.id] = socket;
    }
  }

  public dispose = () => {
    Object.values(this.sockets).forEach(socket => {
      socket?.close();
    });
  };

  private send<T>(chatId: number, payload: T) {
    const socket = this.sockets[chatId];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    } else {
      toastService.error({ body: `Сокетное соединение для чата ${chatId} не установлено` });
    }
  }

  public sendMessageToChat = (chatId: number, content: string) => {
    this.send(chatId, { content, type: 'message' });
  };

  public getUnreadMessagesInChat = async (chatId: number): Promise<Message[]> => {
    const socket = this.sockets[chatId];
    const countUnreadMessages = await chatService.getCountUnreadMessagesInChat(chatId);
    const unreadMessages: Message[] = [];

    return new Promise((resolve, reject) => {
      const requestUnreadMessages = (offset: number) => {
        this.send(chatId, { content: `${offset}`, type: 'get old' });
      };

      function errorListener() {
        socket?.removeEventListener('message', unreadMessagesListener);
        socket?.removeEventListener('error', errorListener);
        reject(new Error('Не удалось загрузить непрочитанные сообщения'));
      }

      function unreadMessagesListener({ data }: { data: string }) {
        const messages = JSON.parse(data) as Message[];
        unreadMessages.push(...messages);
        if (unreadMessages.length >= countUnreadMessages) {
          socket?.removeEventListener('message', unreadMessagesListener);
          socket?.removeEventListener('error', errorListener);
          resolve(unreadMessages);
          return;
        }

        requestUnreadMessages(unreadMessages.length);
      }

      socket?.addEventListener('message', unreadMessagesListener);
      socket?.addEventListener('error', errorListener);
      requestUnreadMessages(0);
    });
  };
}

export const messageService = new MessageService();
