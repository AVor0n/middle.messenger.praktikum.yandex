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
  private sockets = new Map<number, WebSocket>();

  private pingIntervalId?: number;

  /** Создает сокет соединение для заданного чата */
  public connect = async (chatId: number) => {
    if (this.sockets.has(chatId)) return;

    const userId = authService.userInfo?.id;
    const token = await chatService.createToken(chatId);

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    socket.addEventListener('close', event => {
      if (!event.wasClean) {
        toastService.error({ body: `Обрыв соединения для чата ${chatId}` });
      }
    });

    socket.addEventListener('message', this.handleMessage);
    this.sockets.set(chatId, socket);
  };

  /** Удаляет сокет подключение для заданного чата */
  public disconnect = (chatId: number) => {
    this.sockets.get(chatId)?.close();
    this.sockets.delete(chatId);
  };

  /** Создает сокет подключения для всех чатов пользователя на текущий момент */
  public async init() {
    const chats = await chatService.getChatsList();

    for await (const chat of chats) {
      await this.connect(chat.id);
    }

    this.pingIntervalId = window.setInterval(this.pingAllSockets, 5000);
    this.emit('init');
  }

  public dispose = () => {
    clearInterval(this.pingIntervalId);
    [...this.sockets.values()].forEach(socket => socket.close());
    this.sockets.clear();
    this.emit('dispose');
  };

  private send<T>(chatId: number, payload: T) {
    const socket = this.sockets.get(chatId);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    } else {
      toastService.error({ body: `Сокетное соединение для чата ${chatId} не установлено` });
    }
  }

  private pingAllSockets = () => {
    [...this.sockets.keys()].forEach(chatId => this.send(Number(chatId), { type: 'ping' }));
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
    const socket = this.sockets.get(chatId);

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
