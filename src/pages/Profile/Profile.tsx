import './Profile.css';

interface ProfileProps {
  imageSrc: string;
  name: string;
  username: string;
  email: string;
  lastname: string;
}

export const Profile: VComponent<ProfileProps> = ({ imageSrc, name, username, email, lastname }) => (
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
        <button className="btn btn--ghost btn--wide btn--xl" id="editPasswordBtn">
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
    <div id="window" className="window"></div>
  </div>
);
