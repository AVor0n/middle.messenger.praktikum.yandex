import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { EditPasswordWindow, EditProfileWindow } from './components';
import * as styles from './Profile.module.css';
import { type UserUpdateRequest } from '@api';
import { Button } from '@uikit';
import { PAGES } from 'app/constants';
import { authService } from 'services';

interface ProfileState extends State {
  formData?: UserUpdateRequest;
  editPasswordVisible: boolean;
  editProfileVisible: boolean;
}

export class Profile extends Component<Props, ProfileState> {
  constructor(props: Props) {
    super({ editPasswordVisible: false, editProfileVisible: false }, props);
  }

  protected init(): void {
    if (authService.userInfo) {
      this.setState({ formData: authService.userInfo });
    }

    authService.on('updateUserInfo', value => {
      this.setState({ formData: value });
    });
  }

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
    if (!this.state.formData) {
      return (
        <div className={styles.page}>
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div className={styles.page}>
        {/* <figure>
          <img className="profile__image" src={this.state.formData.imageSrc} alt={this.state.name} />
          <figcaption className="profile__username">{this.state.username}</figcaption>
        </figure> */}

        <div className={styles.table}>
          <div className="table-list">
            {[
              { title: 'Почта', value: this.state.formData.email },
              { title: 'Логин', value: this.state.formData.login },
              { title: 'Имя', value: this.state.formData.first_name },
              { title: 'Фамилия', value: this.state.formData.second_name },
              { title: 'Имя в чате', value: this.state.formData.display_name },
              { title: 'Телефон', value: this.state.formData.phone },
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
        {this.state.editProfileVisible && (
          <EditProfileWindow data={this.state.formData} onClose={this.closeEditWindow} />
        )}
      </div>
    );
  }
}
