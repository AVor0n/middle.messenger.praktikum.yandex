import { Component, type Props } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './ChatPreview.module.css';
import { type ChatsResponse } from '@api';
import { Avatar } from '@uikit';

interface ChatPreviewProps extends Props, ChatsResponse {
  onClick: (chatId: number) => void;
  active?: boolean;
}

export class ChatPreview extends Component<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({}, props);
  }

  public render({ avatar, last_message, title, unread_count, id, onClick, active }: ChatPreviewProps) {
    return (
      <div className={clsx(styles.chat, active && styles.active)} $click={() => onClick(id)}>
        <Avatar containerCls={styles.avatar} src={avatar ?? undefined} />
        <h3 className={styles.username}>{title}</h3>
        <p className={styles.lastMessage}>{last_message?.content}</p>
        <span className={styles.time}>{last_message?.time}</span>
        {unread_count > 0 && <span className={styles.unreadCounter}>{unread_count}</span>}
      </div>
    );
  }
}
