import {
  Component,
  validate,
  email,
  required,
  login,
  phone,
  password,
  onlyLetters,
  firstUpperLetter,
  type State,
  type Props,
  repeatPassword,
} from '@shared';
import { TextBox } from '@uikit';
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

  private onEnterClick = (e: Event) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(this.state.formData);
    Object.assign(document.createElement('a'), { href: '#/chat' }).click();
  };

  public render() {
    const emailValidate = validate(this.state.email, required, email);
    const loginValidate = validate(this.state.login, required, login);
    const firstNameValidate = validate(this.state.firstName, required, onlyLetters, firstUpperLetter);
    const secondNameValidate = validate(this.state.secondName, required, onlyLetters, firstUpperLetter);
    const phoneValidate = validate(this.state.phone, required, phone);
    const passwordValidate = validate(this.state.password, required, password);
    const repeatPasswordValidate = validate(this.state.repeatPassword, repeatPassword(this.state.password));
    const isDisabledEnterBtn = [
      emailValidate,
      loginValidate,
      firstNameValidate,
      secondNameValidate,
      phoneValidate,
      passwordValidate,
      repeatPasswordValidate,
    ].some(result => !result.isValid);

    return (
      <div className="page auth-page">
        <form className="auth-form" onsubmit="false">
          <h2 className="auth-form__title">Регистрация</h2>

          <div className="auth-form__fields">
            <TextBox
              label="Почта"
              type="email"
              name="email"
              onChange={value => {
                this.state.email = value;
              }}
              error={emailValidate.error}
            />
            <TextBox
              label="Логин"
              type="text"
              name="login"
              onChange={value => {
                this.state.login = value;
              }}
              error={loginValidate.error}
            />
            <TextBox
              label="Имя"
              type="text"
              name="first_name"
              onChange={value => {
                this.state.firstName = value;
              }}
              error={firstNameValidate.error}
            />
            <TextBox
              label="Фамилия"
              type="text"
              name="second_name"
              onChange={value => {
                this.state.secondName = value;
              }}
              error={secondNameValidate.error}
            />
            <TextBox
              label="Телефон"
              type="tel"
              name="phone"
              onChange={value => {
                this.state.phone = value;
              }}
              error={phoneValidate.error}
            />
            <TextBox
              label="Пароль"
              type="password"
              name="password"
              onChange={value => {
                this.state.password = value;
              }}
              error={passwordValidate.error}
            />
            <TextBox
              label="Пароль (ещё раз)"
              type="password"
              onChange={value => {
                this.state.repeatPassword = value;
              }}
              error={repeatPasswordValidate.error}
            />
          </div>

          <div className="auth-form__btns">
            <button
              className="btn btn--primary btn--flex btn--xl"
              $click={e => this.onEnterClick(e)}
              disabled={isDisabledEnterBtn}
            >
              Зарегистрироваться
            </button>
            <a className="btn btn--ghost btn--flex btn--xl" href="#/login">
              Войти
            </a>
          </div>
        </form>
      </div>
    );
  }
}
