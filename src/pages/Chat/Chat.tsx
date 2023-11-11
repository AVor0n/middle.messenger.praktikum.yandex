import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import * as styles from './Chat.module.css';
import { ChatHeader, ChatList, CreateChatButton, MessageList } from './components';
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

  onToggleActiveChat = (chat?: ChatsResponse) => {
    this.state.activeChat = chat;
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
          <ChatHeader title={this.state.activeChat?.title} avatar={this.state.activeChat?.avatar} />
          <Separator />

          <MessageList />
          <Separator />

          {/* <form className="chat__editor">
            <button className="chat__attach-btn btn btn--ghost btn--circle btn--l" />
            <input
              className="chat__input"
              type="text"
              placeholder="Сообщение"
              name="message"
              value={this.state.message}
              $input={e => {
                this.state.message = (e.target as HTMLInputElement).value;
              }}
            />
            <button className="chat__send-btn btn btn--primary btn--circle btn--l" disabled={!this.state.message}>
              🡒
            </button>
          </form> */}
        </div>
      </div>
    );
  }
}
