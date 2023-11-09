import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { login, password, required, validate } from '@shared/Validator';
import * as styles from './Login.module.css';
import { stringifyApiError, type SignInRequest } from '@api';
import { Button, TextBox } from '@uikit';
import { PAGES } from 'app/constants';
import { authService } from 'services';

interface LoginPageState extends State {
  formData: SignInRequest;
  isLoading?: boolean;
  error?: string;
}

export class LoginPage extends Component<Props, LoginPageState> {
  constructor() {
    super({ formData: { login: '', password: '' } }, {});
  }

  get validateForm() {
    const validateResult = {
      login: validate(this.state.formData.login, required, login),
      password: validate(this.state.formData.password, required, password),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onEnterClick = async () => {
    this.state.isLoading = true;
    try {
      await authService.login(this.state.formData);
    } catch (error) {
      this.setState({ error: stringifyApiError(error) });
    }
    this.state.isLoading = false;
  };

  public render() {
    return (
      <div className={styles.page}>
        <form className={styles.form}>
          <h2 className={styles.title}>Вход</h2>

          <div className={styles.fields}>
            <TextBox
              label="Логин"
              type="text"
              name="login"
              value={this.state.formData.login}
              autocomplete="username"
              onChange={value => this.setState({ formData: { ...this.state.formData, login: value }, error: '' })}
              error={this.validateForm.login.error}
            />
            <TextBox
              label="Пароль"
              type="password"
              name="password"
              autocomplete="current-password"
              value={this.state.formData.password}
              onChange={value => this.setState({ formData: { ...this.state.formData, password: value }, error: '' })}
              error={this.validateForm.password.error}
            />
          </div>

          <div className={styles.buttons}>
            <Button
              text="Войти"
              size="xl"
              type="submit"
              $click={this.onEnterClick}
              disabled={!this.validateForm.isValid}
              showLoader={this.state.isLoading}
            />
            <Button
              text="Нет аккаунта?"
              size="xl"
              buttonType="ghost"
              $click={(e: MouseEvent) => {
                e.preventDefault();
                router.navigate(PAGES.AUTH);
              }}
            />
          </div>
          <div className={styles.errorCause}>{this.state.error}</div>
        </form>
      </div>
    );
  }
}
