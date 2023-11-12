import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import * as styles from './Chat.module.css';
import { ChatHeader, ChatList, CreateChatButton, MessageEditor, MessageList } from './components';
import { type ChatsResponse } from '@api';
import { Button, Search, Separator } from '@uikit';
import { PAGES } from 'app/constants';
import { chatService } from 'services';

interface ChatState extends State {
  activeChat?: ChatsResponse;
  chatList: ChatsResponse[];
  search: string;
}

export class Chat extends Component<Props, ChatState> {
  constructor() {
    super({ chatList: chatService.chatList, search: '' }, {});
  }

  protected init(): void {
    chatService.on('chatListUpdate', () => {
      this.onFilterChats(this.state.search);
    });
  }

  onFilterChats = (search: string) => {
    this.state.chatList = chatService.chatList.filter(chat => !search || chat.title.includes(search));
  };

  onToggleActiveChat = (chat: ChatsResponse) => {
    this.state.activeChat = this.state.activeChat?.id === chat.id ? undefined : chat;
  };

  public render() {
    return (
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <nav className={styles.sidebarTools}>
            <Button text="Профиль" buttonType="ghost" flex size="xl" $click={() => router.navigate(PAGES.PROFILE)} />
            <Search onChange={this.onFilterChats} />
          </nav>
          <Separator />
          <ChatList
            chats={this.state.chatList}
            activeChat={this.state.activeChat}
            onClickChat={this.onToggleActiveChat}
          />
          <CreateChatButton cls={styles.createButton} />
        </div>

        <div className={styles.chat}>
          <ChatHeader activeChat={this.state.activeChat} />
          <Separator />

          <MessageList />
          <Separator />

          <MessageEditor />
        </div>
      </div>
    );
  }
}
