import { Component } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { Avatar } from '@uikit';
import { authService, chatService } from 'services';

export class ChatHeader extends Component {
  constructor() {
    super({}, {});
  }

  protected init(): void {
    chatService.on('changeActiveChat', () => {
      this.dispatchComponentUpdate({}, {});
    });
  }

  public render() {
    const { activeChat } = chatService;
    const { userInfo } = authService;

    const avatar = activeChat ? activeChat.avatar : userInfo?.avatar;
    const title = activeChat ? activeChat.title : userInfo?.display_name;

    return (
      <div className={styles.header}>
        <Avatar src={avatar ?? undefined} containerCls={styles.avatar} />
        <div className={styles.username}>{title}</div>
      </div>
    );
  }
}
