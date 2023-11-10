import { Component, type Props, type State } from '@shared/NotReact';
import { $ } from '@shared/utils';
import defaultAvatar from './defaultAvatar.svg';
import * as styles from './EditableAvatar.module.css';
import { authService, fileService } from 'services';

interface EditableAvatarProps extends Props {}

interface EditableAvatarState extends State {
  avatarSrc?: string;
  userName?: string;
}

export class EditableAvatar extends Component<EditableAvatarProps, EditableAvatarState> {
  constructor(props: EditableAvatarProps) {
    super(
      {
        avatarSrc: defaultAvatar,
        userName: authService.userInfo?.display_name,
      },
      props,
    );
  }

  protected init() {
    if (authService.userInfo?.avatar) {
      this.state.avatarSrc = fileService.getLinkToFile(authService.userInfo.avatar);
    }

    authService.on('updateUserInfo', userInfo => {
      if (userInfo) {
        this.setState({
          avatarSrc: fileService.getLinkToFile(userInfo.avatar),
          userName: userInfo.display_name,
        });
      }
    });
  }

  onClickAvatar = () => {
    const fileInput = $('#avatarInput', this.ref as HTMLElement);
    fileInput.click();
  };

  onChangeAvatar = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      await authService.updateAvatar(file);
    }
  };

  public render() {
    return (
      <figure>
        <img
          className={styles.avatar}
          src={this.state.avatarSrc}
          alt="profile image"
          title="Сменить изображение"
          $click={this.onClickAvatar}
        />
        <input type="file" hidden id="avatarInput" $change={this.onChangeAvatar} accept=".jpg, .png, .jpeg, .gif" />
        <figcaption className={styles.username}>{this.state.userName}</figcaption>
      </figure>
    );
  }
}
