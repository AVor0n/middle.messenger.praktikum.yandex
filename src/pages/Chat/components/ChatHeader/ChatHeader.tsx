import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { EditChatMembersButton } from '../EditChatMembersButton';
import { type ChatsResponse } from '@api';
import { Avatar } from '@uikit';
import { authService } from 'services';

interface ChatHeaderProps extends Props {
  activeChat?: ChatsResponse;
}

export class ChatHeader extends Component<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({}, props);
  }

  public render({ activeChat }: ChatHeaderProps) {
    const avatar = activeChat ? activeChat.avatar : authService.userInfo?.avatar;
    const title = activeChat ? activeChat.title : authService.userInfo?.display_name;

    return (
      <div className={styles.header}>
        <Avatar src={avatar ?? undefined} containerCls={styles.avatar} />
        <div className={styles.username}>{title}</div>

        {activeChat && <EditChatMembersButton className={styles.membersButton} chatId={activeChat.id} />}
      </div>
    );
  }
}
