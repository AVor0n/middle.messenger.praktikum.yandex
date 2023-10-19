import { TextBox } from '@uikit';
import './Auth.css';

export const Auth = () => (
  <div className="page auth-page">
    <form className="auth-form" onsubmit="false">
      <h2 className="auth-form__title">Регистрация</h2>

      <div className="auth-form__fields">
        <TextBox label="Почта" type="email" name="email" />
        <TextBox label="Логин" type="text" name="login" />
        <TextBox label="Имя" type="text" name="first_name" />
        <TextBox label="Фамилия" type="text" name="second_name" />
        <TextBox label="Телефон" type="tel" name="phone" />
        <TextBox label="Пароль" type="password" name="password" />
        <TextBox label="Пароль (ещё раз)" type="password" />
      </div>

      <div className="auth-form__btns">
        <a className="btn btn--primary btn--flex btn--xl" href="#/chat">
          Зарегистрироваться
        </a>
        <a className="btn btn--ghost btn--flex btn--xl" href="#/login">
          Войти
        </a>
      </div>
    </form>
  </div>
);
