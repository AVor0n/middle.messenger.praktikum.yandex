import { Component, type Props, type State } from '@shared/NotReact';
import { email, firstUpperLetter, login, onlyLetters, phone, required, validate } from '@shared/Validator';
import * as styles from '../Profile.module.css';
import { stringifyApiError, type UserUpdateRequest } from '@api';
import { EditWindow, TextBox } from '@uikit';
import { authService } from 'services';

interface EditProfileWindowProps extends Props {
  onClose: () => void;
}

interface EditProfileWindowState extends State, Required<UserUpdateRequest> {
  isLoading?: boolean;
  responseError?: string;
}

export class EditProfileWindow extends Component<EditProfileWindowProps, EditProfileWindowState> {
  constructor(props: EditProfileWindowProps) {
    super(
      {
        email: authService.userInfo?.email ?? '',
        login: authService.userInfo?.login ?? '',
        display_name: authService.userInfo?.display_name ?? '',
        first_name: authService.userInfo?.first_name ?? '',
        second_name: authService.userInfo?.second_name ?? '',
        phone: authService.userInfo?.phone ?? '',
      },
      props,
    );
  }

  get validateForm() {
    const validateResult = {
      email: validate(this.state.email, required, email),
      login: validate(this.state.login, required, login),
      display_name: validate(this.state.display_name, required, onlyLetters, firstUpperLetter),
      first_name: validate(this.state.first_name, required, onlyLetters, firstUpperLetter),
      second_name: validate(this.state.second_name, required, onlyLetters, firstUpperLetter),
      phone: validate(this.state.phone, required, phone),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onSave = async () => {
    this.state.isLoading = true;
    try {
      await authService.updateProfile(this.state);
      this.props.onClose();
    } catch (error) {
      this.state.responseError = stringifyApiError(error);
    }
    this.state.isLoading = true;
  };

  private onClose = () => {
    this.props.onClose();
  };

  public render() {
    const fields: { label: string; name: keyof UserUpdateRequest; type?: HTMLInputElement['type'] }[] = [
      { label: 'Почта', name: 'email', type: 'email' },
      { label: 'Логин', name: 'login' },
      { label: 'Имя', name: 'first_name' },
      { label: 'Фамилия', name: 'second_name' },
      { label: 'Имя в чате', name: 'display_name' },
      { label: 'Телефон', name: 'phone' },
    ];

    return (
      <div className={styles.window}>
        <EditWindow saveAvailable={this.validateForm.isValid} onSave={this.onSave} onClose={this.onClose}>
          {fields.map(field => (
            <TextBox
              key={field.name}
              label={field.label}
              type={field.type ?? 'text'}
              name={field.name}
              value={this.state[field.name]}
              onChange={value => {
                this.state[field.name] = value;
              }}
              error={this.validateForm[field.name].error}
            />
          ))}
        </EditWindow>
        {this.state.responseError && <div className={styles.responseError}>{this.state.responseError}</div>}
      </div>
    );
  }
}
