import { Component, type PropsWithChildren } from '@shared/NotReact';
import { clsx } from '@shared/utils';
import * as styles from './UserPreview.module.css';
import { type UserPreviewData } from '../../types';
import { Avatar } from '@uikit';
import { fileService } from 'services';

type UserPreviewProps = PropsWithChildren<{
  userData: UserPreviewData;
  className?: string;
}>;

export class UserPreview extends Component<UserPreviewProps> {
  constructor(props: UserPreviewProps) {
    super({}, props);
  }

  public render() {
    const { userData } = this.props;
    const avatarSrc = userData.avatar ? fileService.getLinkToFile(userData.avatar) : undefined;

    return (
      <div className={clsx(styles.container, this.props.className)}>
        <Avatar src={avatarSrc} containerCls={styles.avatar} />
        <h2 className={styles.name}>
          {userData.firstName} {userData.secondName}
        </h2>
        <div className={styles.login}>
          {userData.login} <span className={styles.id}>#{userData.id}</span>
        </div>
        <div className={styles.actions}>{this.props.children}</div>
      </div>
    );
  }
}
