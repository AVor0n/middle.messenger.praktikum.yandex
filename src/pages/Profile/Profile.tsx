import { EditPasswordWindow } from './components';
import { Component, type State, type Props } from '@shared';
import './Profile.css';

interface ProfileProps extends Props {
  imageSrc: string;
  name: string;
  username: string;
  email: string;
  lastname: string;
}

interface ProfileState extends State {
  editPasswordVisible: boolean;
}

export class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(
      {
        editPasswordVisible: false,
      },
      props,
    );
  }

  public render({ imageSrc, name, username, email, lastname }: ProfileProps) {
    return (
      <div className="page profile-page">
        <figure>
          <img className="profile__image" src={imageSrc} alt={name} />
          <figcaption className="profile__username">{username}</figcaption>
        </figure>

        <div className="profile-data">
          <div className="table-list">
            <div className="table-list__row">
              <span className="table-list__header">Почта</span>
              <span className="table-list__value">{email}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Логин</span>
              <span className="table-list__value">{email}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Имя</span>
              <span className="table-list__value">{name}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Фамилия</span>
              <span className="table-list__value">{lastname}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Имя в чате</span>
              <span className="table-list__value">{username}</span>
            </div>
            <div className="table-list__row">
              <span className="table-list__header">Телефон</span>
              <span className="table-list__value">{email}</span>
            </div>
          </div>

          <div className="profile-data__btns">
            <button className="btn btn--ghost btn--wide btn--xl" id="editDataBtn">
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
          <a className="btn btn--ghost btn--wide btn--xl" href="#/chat">
            Назад
          </a>
          <a className="btn btn--ghost btn--wide btn--xl btn--danger" href="#/login">
            Выйти
          </a>
        </div>
        {this.state.editPasswordVisible && (
          <EditPasswordWindow
            onClose={() => {
              this.state.editPasswordVisible = false;
            }}
          />
        )}
      </div>
    );
  }
}
