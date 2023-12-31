import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { EditPasswordWindow, EditProfileWindow } from './components';
import * as styles from './Profile.module.css';
import { Avatar, Button } from '@uikit';
import { PAGES } from 'app/constants';
import { authService, fileService } from 'services';

interface ProfileState extends State {
  editPasswordVisible: boolean;
  editProfileVisible: boolean;
}

export class Profile extends Component<Props, ProfileState> {
  constructor(props: Props) {
    super({ editPasswordVisible: false, editProfileVisible: false }, props);
  }

  protected init(): void {
    authService.on('updateUserInfo', () => {
      this.setState(this.state);
    });
  }

  onChangeAvatar = async (file: File) => {
    await authService.updateAvatar(file);
  };

  openEditPasswordWindow = () => {
    this.state.editPasswordVisible = true;
  };

  openEditProfileWindow = () => {
    this.state.editProfileVisible = true;
  };

  closeEditWindow = () => {
    this.setState({
      editPasswordVisible: false,
      editProfileVisible: false,
    });
  };

  public render() {
    const { userInfo } = authService;

    if (!userInfo) {
      return (
        <div className={styles.page}>
          <div>Loading...</div>
        </div>
      );
    }

    const avatarSrc = userInfo.avatar ? fileService.getLinkToFile(userInfo.avatar) : undefined;
    return (
      <div className={styles.page}>
        <Avatar src={avatarSrc} $change={this.onChangeAvatar} containerCls={styles.avatar} />

        <div className={styles.table}>
          <div className="table-list">
            {[
              { title: 'Почта', value: userInfo.email },
              { title: 'Логин', value: userInfo.login },
              { title: 'Имя', value: userInfo.first_name },
              { title: 'Фамилия', value: userInfo.second_name },
              { title: 'Имя в чате', value: userInfo.display_name },
              { title: 'Телефон', value: userInfo.phone },
            ].map(({ title, value }) => (
              <div className="table-list__row" key={title}>
                <span className="table-list__header">{title}</span>
                <span className="table-list__value">{value}</span>
              </div>
            ))}
          </div>

          <div className={styles.editBtns}>
            <Button
              flex
              size="xl"
              id="editDataBtn"
              text="Редактировать данные"
              buttonType="ghost"
              $click={this.openEditProfileWindow}
            />
            <Button
              flex
              size="xl"
              id="editDataBtn"
              text="Сменить пароль"
              buttonType="ghost"
              $click={this.openEditPasswordWindow}
            />
          </div>
        </div>

        <div className={styles.navigation}>
          <Button text="Назад" size="xl" flex buttonType="ghost" $click={() => router.navigate(PAGES.CHAT)} />
          <Button text="Выйти" size="xl" buttonType="ghost" flex $click={authService.logout} className={styles.exit} />
        </div>

        {this.state.editPasswordVisible && <EditPasswordWindow onClose={this.closeEditWindow} />}
        {this.state.editProfileVisible && <EditProfileWindow onClose={this.closeEditWindow} />}
      </div>
    );
  }
}
