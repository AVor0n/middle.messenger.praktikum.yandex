import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { toastService } from '@shared/ToastService';
import * as styles from './Chat.module.css';
import { ChatHeader, ChatList, CreateChatButton, MessageEditor, MessageList } from './components';
import { stringifyApiError, type ChatsResponse } from '@api';
import { Button, Search, Separator } from '@uikit';
import { PAGES } from 'app/constants';
import { chatService } from 'services';
import { messageService } from 'services/MessageService';

interface ChatState extends State {
  activeChat?: ChatsResponse;
  chatList: ChatsResponse[];
  search: string;
}

export class Chat extends Component<Props, ChatState> {
  constructor() {
    super({ chatList: chatService.chatList, search: '' }, {});
  }

  filterChats = () => {
    this.onFilterChats(this.state.search);
  };

  protected init(): void {
    chatService.on('chatListUpdate', this.filterChats);
    messageService.init().catch(() =>
      toastService.error({
        body: 'Не удалось инициализировать сокет соединение',
      }),
    );
  }

  protected componentDidUnmount(): void {
    chatService.off('chatListUpdate', this.filterChats);
    messageService.dispose();
  }

  onFilterChats = (search: string) => {
    this.state.chatList = chatService.chatList.filter(chat => !search || chat.title.includes(search));
  };

  onToggleActiveChat = (chat: ChatsResponse) => {
    this.state.activeChat = this.state.activeChat?.id === chat.id ? undefined : chat;
  };

  onChangeAvatar = async (file: File): Promise<void> => {
    if (this.state.activeChat) {
      try {
        const updatedChat = await chatService.updateAvatar({ chatId: this.state.activeChat.id, avatar: file });
        this.setState({
          activeChat: updatedChat,
          chatList: this.state.chatList.map(chat => (chat.id === updatedChat.id ? updatedChat : chat)),
        });
      } catch (error) {
        toastService.error({ body: stringifyApiError(error) });
      }
    }
  };

  public render() {
    const { activeChat } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <nav className={styles.sidebarTools}>
            <Button text="Профиль" buttonType="ghost" flex size="xl" $click={() => router.navigate(PAGES.PROFILE)} />
            <Search onChange={this.onFilterChats} />
          </nav>
          <Separator />
          <ChatList chats={this.state.chatList} activeChat={activeChat} onClickChat={this.onToggleActiveChat} />
          <CreateChatButton cls={styles.createButton} />
        </div>

        <div className={styles.chat}>
          <ChatHeader
            activeChat={activeChat}
            onChangeAvatar={file => this.onChangeAvatar(file)}
            resetActiveChat={() => {
              this.state.activeChat = undefined;
            }}
          />
          <Separator />

          {/* TODO: добавить поддержку фрагментов */}
          {activeChat && <MessageList activeChatId={activeChat.id} />}
          {activeChat && <Separator />}
          {activeChat && <MessageEditor activeChatId={activeChat.id} />}
        </div>
      </div>
    );
  }
}
