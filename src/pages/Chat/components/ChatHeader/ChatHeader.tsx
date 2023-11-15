import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { EditChatMembersButton } from '../EditChatMembersButton';
import { type ChatsResponse } from '@api';
import { Avatar } from '@uikit';
import { fileService } from 'services';

interface ChatHeaderProps extends Props {
  activeChat?: ChatsResponse;
  onChangeAvatar: (file: File) => Promise<void>;
  resetActiveChat: () => void;
}

export class ChatHeader extends Component<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({}, props);
  }

  public render({ activeChat }: ChatHeaderProps) {
    const avatar = activeChat?.avatar ? fileService.getLinkToFile(activeChat.avatar) : undefined;
    const title = activeChat ? activeChat.title : 'Выберите чат для просмотра сообщений';

    return (
      <div className={styles.header}>
        <Avatar
          containerCls={styles.avatar}
          src={avatar ?? undefined}
          $change={file => (activeChat ? this.props.onChangeAvatar(file) : undefined)}
        />
        <div className={styles.username}>{title}</div>

        {activeChat && (
          <EditChatMembersButton
            className={styles.membersButton}
            chatId={activeChat.id}
            resetActiveChat={this.props.resetActiveChat}
          />
        )}
      </div>
    );
  }
}
