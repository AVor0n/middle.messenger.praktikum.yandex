import { Component, type Props, type State } from '@shared/NotReact';
import { Link } from '@shared/NotReactRouter';
import { EditPasswordWindow, EditProfileWindow } from './components';
import { userInfo } from './fake-data';
import { PAGES } from 'app/constants';
import './Profile.css';

interface ProfileState extends State {
  imageSrc: string;
  name: string;
  login: string;
  username: string;
  email: string;
  lastname: string;
  phone: string;
  editPasswordVisible: boolean;
  editProfileVisible: boolean;
}

export class Profile extends Component<Props, ProfileState> {
  constructor(props: Props) {
    super(
      {
        ...userInfo,
        editPasswordVisible: false,
        editProfileVisible: false,
      },
      props,
    );
  }

  public render() {
    return (
      <div className="page profile-page">
        <figure>
          <img className="profile__image" src={this.state.imageSrc} alt={this.state.name} />
          <figcaption className="profile__username">{this.state.username}</figcaption>
        </figure>

        <div className="profile-data">
          <div className="table-list">
            <div className="table-list__row">
              <span className="table-list__header">Почта</span>
              <span className="table-list__value">{this.state.email}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Логин</span>
              <span className="table-list__value">{this.state.login}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Имя</span>
              <span className="table-list__value">{this.state.name}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Фамилия</span>
              <span className="table-list__value">{this.state.lastname}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Имя в чате</span>
              <span className="table-list__value">{this.state.username}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Телефон</span>
              <span className="table-list__value">{this.state.email}</span>
            </div>
          </div>

          <div className="profile-data__btns">
            <button
              className="btn btn--ghost btn--wide btn--xl"
              id="editDataBtn"
              $click={() => {
                this.state.editProfileVisible = true;
              }}
            >
              Редактировать данные
            </button>
            <button
              className="btn btn--ghost btn--wide btn--xl"
              id="editPasswordBtn"
              $click={() => {
                this.state.editPasswordVisible = true;
              }}
            >
              Сменить пароль
            </button>
          </div>
        </div>

        <div className="profile__navigation">
          <Link className="btn btn--ghost btn--wide btn--xl" href={PAGES.CHAT}>
            Назад
          </Link>
          <Link className="btn btn--ghost btn--wide btn--xl btn--danger" href={PAGES.LOGIN}>
            Выйти
          </Link>
        </div>
        {this.state.editPasswordVisible && (
          <EditPasswordWindow
            onClose={() => {
              this.state.editPasswordVisible = false;
            }}
          />
        )}
        {this.state.editProfileVisible && (
          <EditProfileWindow
            data={{
              email: this.state.email,
              login: this.state.login,
              display_name: this.state.username,
              first_name: this.state.name,
              second_name: this.state.lastname,
              phone: this.state.phone,
            }}
            onSave={data =>
              this.setState({
                username: data.display_name,
                name: data.first_name,
                lastname: data.second_name,
                login: data.login,
                email: data.email,
                phone: data.phone,
              })
            }
            onClose={() => {
              this.state.editProfileVisible = false;
            }}
          />
        )}
      </div>
    );
  }
}
