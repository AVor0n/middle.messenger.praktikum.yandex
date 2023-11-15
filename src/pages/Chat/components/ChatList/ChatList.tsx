import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatList.module.css';
import { ChatPreview } from './components';
import { type ChatsResponse } from '@api';
import { Separator } from '@uikit';

interface ChatListProps extends Props {
  activeChat?: ChatsResponse;
  chats: ChatsResponse[];
  onClickChat: (chat: ChatsResponse) => void;
}

export class ChatList extends Component<ChatListProps> {
  constructor(props: ChatListProps) {
    super({}, props);
  }

  public render({ activeChat, chats, onClickChat }: ChatListProps) {
    return (
      <div className={styles.list}>
        {!chats.length && <div className={styles.placeholder}>Чатов пока нет</div>}

        {chats.map(chat => (
          <div key={String(chat.id)}>
            <ChatPreview chatData={chat} active={chat.id === activeChat?.id} onClick={onClickChat} />
            <Separator />
          </div>
        ))}
      </div>
    );
  }
}
