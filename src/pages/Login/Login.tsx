import { Component, type Props, type State } from '@shared/NotReact';
import { Link } from '@shared/NotReactRouter';
import { router } from '@shared/Router';
import { removeProxy } from '@shared/utils';
import { login, password, required, validate } from '@shared/Validator';
import { TextBox } from '@uikit';
import { PAGES } from 'app/constants';
import './Login.css';

interface LoginState extends State {
  login: string;
  password: string;
}

export class Login extends Component<Props, LoginState> {
  constructor() {
    super(
      {
        login: '',
        password: '',
      },
      {},
    );
  }

  get validateForm() {
    const validateResult = {
      login: validate(this.state.login, required, login),
      password: validate(this.state.password, required, password),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onEnterClick = (e: Event) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(removeProxy(this.state));
    router.navigate(PAGES.CHAT);
  };

  public render() {
    return (
      <div className="page login-page">
        <form className="login-form">
          <h2 className="login-form__title">Вход</h2>

          <div className="login-form__fields">
            <TextBox
              label="Логин"
              type="text"
              name="login"
              value={this.state.login}
              autocomplete="username"
              onChange={value => {
                this.state.login = value;
              }}
              error={this.validateForm.login.error}
            />
            <TextBox
              label="Пароль"
              type="password"
              name="password"
              autocomplete="current-password"
              value={this.state.password}
              onChange={value => {
                this.state.password = value;
              }}
              error={this.validateForm.password.error}
            />
          </div>

          <div className="login-form__btns">
            <button
              type="button"
              className="btn btn--primary btn--flex btn--xl"
              disabled={!this.validateForm.isValid}
              $click={e => this.onEnterClick(e)}
            >
              Войти
            </button>
            <Link href={PAGES.AUTH} className="btn btn--ghost btn--flex btn--xl">
              Нет аккаунта?
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
