import { Component, type State, type Props } from '@shared/NotReact';
import * as styles from './ChatList.module.css';
import { ChatPreview } from './components';
import { CreateChatButton } from '../CreateChatButton';
import { type ChatsResponse } from '@api';
import { Separator } from '@uikit';
import { chatService } from 'services';

interface ChatListState extends State {
  chats: ChatsResponse[];
}

export class ChatList extends Component<Props, ChatListState> {
  constructor(props: Props) {
    super({ chats: chatService.chatList }, props);
  }

  protected init(): void {
    chatService.on('changeActiveChat', () => {
      this.setState(this.state);
    });

    chatService.on('chatListUpdate', chatList => {
      this.setState({ chats: chatList });
    });
  }

  onToggleActiveChat = (chat: ChatsResponse) => {
    chatService.activeChat = chatService.activeChat?.id === chat.id ? undefined : chat;
  };

  public render() {
    return (
      <div className={styles.list}>
        {!this.state.chats.length && <div className={styles.placeholder}>Чатов пока нет</div>}

        {this.state.chats.map(chat => (
          <div key={String(chat.id)}>
            <ChatPreview
              chatData={chat}
              active={chat.id === chatService.activeChat?.id}
              onClick={this.onToggleActiveChat}
            />
            <Separator />
          </div>
        ))}

        <CreateChatButton cls={styles.createButton} />
      </div>
    );
  }
}
