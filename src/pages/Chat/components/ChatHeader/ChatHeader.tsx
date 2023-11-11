import { Component, type Props } from '@shared/NotReact';
import * as styles from './ChatHeader.module.css';
import { Avatar } from '@uikit';
import { authService } from 'services';

interface ChatHeaderProps extends Props {
  avatar?: string;
  title?: string;
}

export class ChatHeader extends Component<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({}, props);
  }

  public render({ avatar, title }: ChatHeaderProps) {
    const { userInfo } = authService;
    const userName = userInfo?.display_name ?? `${userInfo?.first_name} ${userInfo?.second_name}`;

    return (
      <div className={styles.header}>
        <Avatar src={avatar ?? authService.userInfo?.avatar} containerCls={styles.avatar} />
        <div className={styles.username}>{title ?? userName}</div>
      </div>
    );
  }
}
