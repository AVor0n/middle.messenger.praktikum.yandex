import { Component, type Props, type State } from '@shared/NotReact';
import { Link } from '@shared/NotReactRouter';
import { router } from '@shared/Router';
import { removeProxy } from '@shared/utils';
import {
  email,
  firstUpperLetter,
  login,
  onlyLetters,
  password,
  phone,
  repeatPassword,
  required,
  validate,
} from '@shared/Validator';
import { TextBox } from '@uikit';
import { PAGES } from 'app/constants';
import './Auth.css';

interface AuthState extends State {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

export class Auth extends Component<Props, AuthState> {
  constructor() {
    super(
      {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        repeatPassword: '',
      },
      {},
    );
  }

  get validateForm() {
    const validateResult = {
      email: validate(this.state.email, required, email),
      login: validate(this.state.login, required, login),
      firstName: validate(this.state.firstName, required, onlyLetters, firstUpperLetter),
      secondName: validate(this.state.secondName, required, onlyLetters, firstUpperLetter),
      phone: validate(this.state.phone, required, phone),
      password: validate(this.state.password, required, password),
      repeatPassword: validate(this.state.repeatPassword, repeatPassword(this.state.password)),
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
      <div className="page auth-page">
        <form className="auth-form" onsubmit="false">
          <h2 className="auth-form__title">Регистрация</h2>

          <div className="auth-form__fields">
            <TextBox
              label="Почта"
              type="email"
              name="email"
              autocomplete="email"
              onChange={value => {
                this.state.email = value;
              }}
              error={this.validateForm.email.error}
            />
            <TextBox
              label="Логин"
              type="text"
              name="login"
              onChange={value => {
                this.state.login = value;
              }}
              error={this.validateForm.login.error}
            />
            <TextBox
              label="Имя"
              type="text"
              name="first_name"
              autocomplete="name"
              onChange={value => {
                this.state.firstName = value;
              }}
              error={this.validateForm.firstName.error}
            />
            <TextBox
              label="Фамилия"
              type="text"
              name="second_name"
              autocomplete="family-name"
              onChange={value => {
                this.state.secondName = value;
              }}
              error={this.validateForm.secondName.error}
            />
            <TextBox
              label="Телефон"
              type="tel"
              name="phone"
              autocomplete="tel"
              onChange={value => {
                this.state.phone = value;
              }}
              error={this.validateForm.phone.error}
            />
            <TextBox
              label="Пароль"
              type="password"
              name="password"
              autocomplete="new-password"
              onChange={value => {
                this.state.password = value;
              }}
              error={this.validateForm.password.error}
            />
            <TextBox
              label="Пароль (ещё раз)"
              type="password"
              autocomplete="new-password"
              onChange={value => {
                this.state.repeatPassword = value;
              }}
              error={this.validateForm.repeatPassword.error}
            />
          </div>

          <div className="auth-form__btns">
            <button
              className="btn btn--primary btn--flex btn--xl"
              $click={e => this.onEnterClick(e)}
              disabled={!this.validateForm.isValid}
            >
              Зарегистрироваться
            </button>
            <Link href={PAGES.LOGIN} className="btn btn--ghost btn--flex btn--xl">
              Войти
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
