import { Component, type Props } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './ChatPreview.module.css';
import { type ChatsResponse } from '@api';
import { Avatar } from '@uikit';
import { fileService } from 'services';

interface ChatPreviewProps extends Props {
  chatData: ChatsResponse;
  onClick: (chat: ChatsResponse) => void;
  active?: boolean;
}

export class ChatPreview extends Component<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({}, props);
  }

  public render({ chatData, onClick, active }: ChatPreviewProps) {
    const avatarSrc = chatData.avatar ? fileService.getLinkToFile(chatData.avatar) : undefined;
    return (
      <div className={clsx(styles.chat, active && styles.active)} $click={() => onClick(chatData)}>
        <Avatar containerCls={styles.avatar} src={avatarSrc ?? undefined} />
        <h3 className={styles.username}>{chatData.title}</h3>
        <p className={styles.lastMessage}>{chatData.last_message?.content}</p>
        <span className={styles.time}>{chatData.last_message?.time}</span>
        {chatData.unread_count > 0 && <span className={styles.unreadCounter}>{chatData.unread_count}</span>}
      </div>
    );
  }
}
