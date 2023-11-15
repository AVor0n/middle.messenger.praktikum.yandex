import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
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
import * as styles from './Auth.module.css';
import { type SignUpRequest, stringifyApiError } from '@api';
import { Button, TextBox } from '@uikit';
import { PAGES } from 'app/constants';
import { authService } from 'services';

interface AuthPageState extends State {
  formState: SignUpRequest & {
    repeatPassword: string;
  };
  isLoading?: boolean;
  error?: string;
}

export class AuthPage extends Component<Props, AuthPageState> {
  constructor() {
    super(
      {
        formState: {
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
          password: '',
          repeatPassword: '',
        },
      },
      {},
    );
  }

  get validateForm() {
    const validateResult = {
      email: validate(this.state.formState.email, required, email),
      login: validate(this.state.formState.login, required, login),
      first_name: validate(this.state.formState.first_name, required, onlyLetters, firstUpperLetter),
      second_name: validate(this.state.formState.second_name, required, onlyLetters, firstUpperLetter),
      phone: validate(this.state.formState.phone, required, phone),
      password: validate(this.state.formState.password, required, password),
      repeatPassword: validate(this.state.formState.repeatPassword, repeatPassword(this.state.formState.password)),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onEnterClick = async () => {
    this.state.isLoading = true;
    try {
      await authService.auth(this.state.formState);
      router.navigate(PAGES.CHAT);
    } catch (error) {
      this.setState({ error: stringifyApiError(error) });
    }
    this.state.isLoading = false;
  };

  public render() {
    const fields: { label: string; name: keyof AuthPageState['formState']; type?: HTMLInputElement['type'] }[] = [
      { label: 'Почта', name: 'email', type: 'email' },
      { label: 'Логин', name: 'login' },
      { label: 'Имя', name: 'first_name' },
      { label: 'Фамилия', name: 'second_name' },
      { label: 'Телефон', name: 'phone', type: 'tel' },
      { label: 'Пароль', name: 'password', type: 'password' },
      { label: 'Пароль (ещё раз)', name: 'repeatPassword', type: 'password' },
    ];

    return (
      <div className={styles.page}>
        <form className={styles.form}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.fields}>
            {fields.map(field => (
              <TextBox
                key={field.name}
                label={field.label}
                type={field.type ?? 'text'}
                name={field.name}
                value={this.state.formState[field.name]}
                onChange={value => {
                  this.setState({ formState: { ...this.state.formState, [field.name]: value }, error: '' });
                }}
                error={this.validateForm[field.name].error}
              />
            ))}
          </div>

          <div className={styles.buttons}>
            <Button
              text="Зарегистрироваться"
              size="xl"
              type="submit"
              $click={this.onEnterClick}
              disabled={!this.validateForm.isValid}
              showLoader={this.state.isLoading}
            />
            <Button
              text="Уже есть аккаунт?"
              size="xl"
              buttonType="ghost"
              $click={(e: MouseEvent) => {
                e.preventDefault();
                router.navigate(PAGES.LOGIN);
              }}
            />
          </div>
          <div className={styles.errorCause}>{this.state.error}</div>
        </form>
      </div>
    );
  }
}
