import { Component, type Props, type State } from '@shared/NotReact';
import { password, required, validate } from '@shared/Validator';
import { type ChangePasswordRequest, stringifyApiError } from '@api';
import { EditWindow, TextBox } from '@uikit';
import { authService } from 'services';

interface EditPasswordWindowProps extends Props {
  onClose: () => void;
}

interface EditPasswordWindowState extends State {
  formData: ChangePasswordRequest;
  responseError?: string;
  isLoading?: boolean;
}

export class EditPasswordWindow extends Component<EditPasswordWindowProps, EditPasswordWindowState> {
  constructor(props: EditPasswordWindowProps) {
    super({ formData: { oldPassword: '', newPassword: '' } }, props);
  }

  get validateForm() {
    const validateResult = {
      oldPassword: validate(this.state.formData.oldPassword, required, password),
      newPassword: validate(this.state.formData.newPassword, required, password),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onSave = async () => {
    this.state.isLoading = true;
    try {
      await authService.updatePassword(this.state.formData);
      this.props.onClose();
    } catch (error) {
      this.state.responseError = stringifyApiError(error);
    }
    this.state.isLoading = false;
  };

  public render() {
    return (
      <div>
        <EditWindow saveAvailable={this.validateForm.isValid} onSave={this.onSave} onClose={this.props.onClose}>
          <TextBox
            label="Старый пароль"
            type="password"
            name="oldPassword"
            autocomplete="current-password"
            value={this.state.formData.oldPassword}
            onChange={value =>
              this.setState({ formData: { ...this.state.formData, oldPassword: value }, responseError: '' })
            }
            error={this.validateForm.oldPassword.error}
          />
          <TextBox
            label="Новый пароль"
            type="password"
            name="newPassword"
            autocomplete="new-password"
            value={this.state.formData.newPassword}
            onChange={value => {
              this.setState({ formData: { ...this.state.formData, newPassword: value }, responseError: '' });
            }}
            error={this.validateForm.newPassword.error}
          />
        </EditWindow>
      </div>
    );
  }
}
