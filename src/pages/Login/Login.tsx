import { Component } from '@shared';
import './Login.css';
import { TextBox } from '@uikit';

export class Login extends Component {
  constructor() {
    super({}, {});
  }

  public render() {
    return (
      <div className="page login-page">
        <form className="login-form">
          <h2 className="login-form__title">Вход</h2>

          <div className="login-form__fields">
            <TextBox label="Логин" type="text" name="login" />
            <TextBox label="Пароль" type="password" name="password" />
          </div>

          <div className="login-form__btns">
            <a className="btn btn--primary btn--flex btn--xl" href="#/chat">
              Войти
            </a>
            <a className="btn btn--ghost btn--flex btn--xl" href="#/auth">
              Нет аккаунта?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
