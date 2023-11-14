import { EventBus } from '@shared/EventBus';
import { toastService } from '@shared/ToastService';
import { authService } from './AuthService';
import { chatService } from './ChatService';

export interface MessageDto {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
}

class MessageService extends EventBus<{
  init: () => void;
  getMessage: (message: MessageDto) => void;
  dispose: () => void;
}> {
  private sockets: Record<string, WebSocket | undefined> = {};

  private pingIntervalId?: number;

  public async init() {
    const chats = await chatService.getChatsList();
    const userId = authService.userInfo?.id;

    for await (const chat of chats) {
      const token = await chatService.createToken(chat.id);
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chat.id}/${token}`);

      socket.addEventListener('close', event => {
        if (!event.wasClean) {
          toastService.error({ body: `Обрыв соединения для чата ${chat.id}` });
        }
      });

      socket.addEventListener('message', this.handleMessage);
      this.sockets[chat.id] = socket;
    }

    this.pingIntervalId = window.setInterval(this.pingAllSockets, 5000);
    this.emit('init');
  }

  public dispose = () => {
    clearInterval(this.pingIntervalId);
    Object.values(this.sockets).forEach(socket => socket?.close());
    this.sockets = {};
    this.emit('dispose');
  };

  private send<T>(chatId: number, payload: T) {
    const socket = this.sockets[chatId];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    } else {
      toastService.error({ body: `Сокетное соединение для чата ${chatId} не установлено` });
    }
  }

  private pingAllSockets = () => {
    Object.keys(this.sockets).forEach(chatId => this.send(Number(chatId), { type: 'ping' }));
  };

  private handleMessage = (e: MessageEvent<string>) => {
    try {
      const data = JSON.parse(e.data) as { type: 'pong' } | MessageDto;
      if (data.type === 'message') {
        this.emit('getMessage', data);
      }
    } catch {
      toastService.error({ body: 'Ошибка при попытке распарсить сообщение от сокета' });
    }
  };

  public sendMessageToChat = (chatId: number, content: string) => {
    this.send(chatId, { content, type: 'message' });
  };

  public getUnreadMessagesInChat = async (chatId: number, offset: number): Promise<MessageDto[]> => {
    const socket = this.sockets[chatId];

    return new Promise((resolve, reject) => {
      function messageListener({ data }: { data: string }) {
        try {
          const messages = JSON.parse(data) as MessageDto[];
          resolve(messages);
        } catch {
          reject(new Error('Не удалось распарсить данные от сокета'));
        } finally {
          socket?.removeEventListener('message', messageListener);
          socket?.removeEventListener('error', errorListener);
        }
      }

      function errorListener() {
        socket?.removeEventListener('message', messageListener);
        socket?.removeEventListener('error', errorListener);
        reject(new Error('Не удалось загрузить непрочитанные сообщения'));
      }

      socket?.addEventListener('message', messageListener);
      socket?.addEventListener('error', errorListener);
      this.send(chatId, { content: `${offset}`, type: 'get old' });
    });
  };
}

export const messageService = new MessageService();
