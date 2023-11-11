import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { Avatar } from '@uikit';
import { authService } from 'services';

interface ChatHeaderProps extends Props {
  avatar?: string | null;
  title?: string;
}

export class ChatHeader extends Component<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({}, props);
  }

  public render() {
    const hasActiveChat = this.props.title;

    const avatar = hasActiveChat ? this.props.avatar : authService.userInfo?.avatar;
    const title = hasActiveChat ? this.props.title : authService.userInfo?.display_name;

    return (
      <div className={styles.header}>
        <Avatar src={avatar ?? undefined} containerCls={styles.avatar} />
        <div className={styles.username}>{title}</div>
      </div>
    );
  }
}
