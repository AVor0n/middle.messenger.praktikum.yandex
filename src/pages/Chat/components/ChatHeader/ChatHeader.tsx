import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { EditChatMembersButton } from '../EditChatMembersButton';
import { type ChatsResponse } from '@api';
import { Avatar } from '@uikit';
import { chatService, fileService } from 'services';

interface ChatHeaderProps extends Props {
  activeChat?: ChatsResponse;
}

export class ChatHeader extends Component<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({}, props);
  }

  onChangeChatAvatar = async (avatar: File) => {
    if (this.props.activeChat) {
      await chatService.updateAvatar({ chatId: this.props.activeChat.id, avatar });
    }
  };

  public render({ activeChat }: ChatHeaderProps) {
    const avatar = activeChat?.avatar ? fileService.getLinkToFile(activeChat.avatar) : undefined;
    const title = activeChat ? activeChat.title : 'Выберите чат для просмотра сообщений';

    return (
      <div className={styles.header}>
        <Avatar src={avatar ?? undefined} containerCls={styles.avatar} $change={this.onChangeChatAvatar} />
        <div className={styles.username}>{title}</div>

        {activeChat && <EditChatMembersButton className={styles.membersButton} chatId={activeChat.id} />}
      </div>
    );
  }
}
