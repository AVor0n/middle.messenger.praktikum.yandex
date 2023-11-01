import { Component, type Props, type State } from '@shared/NotReact';
import { removeProxy } from '@shared/utils';
import { password, required, validate } from '@shared/Validator';
import { TextBox } from '@uikit';
import { EditWindow } from '@widgets';

interface EditPasswordWindowProps extends Props {
  onClose: () => void;
}

interface EditPasswordWindowState extends State {
  oldPassword: string;
  newPassword: string;
}

export class EditPasswordWindow extends Component<EditPasswordWindowProps, EditPasswordWindowState> {
  constructor(props: EditPasswordWindowProps) {
    super(
      {
        oldPassword: '',
        newPassword: '',
      },
      props,
    );
  }

  get validateForm() {
    const validateResult = {
      oldPassword: validate(this.state.oldPassword, required, password),
      newPassword: validate(this.state.newPassword, required, password),
    };
    return {
      ...validateResult,
      isValid: Object.values(validateResult).every(field => field.isValid),
    };
  }

  private onSave = (e: Event) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(removeProxy(this.state));
    this.props.onClose();
  };

  private onClose = (e: Event) => {
    e.preventDefault();
    this.props.onClose();
  };

  public render() {
    return (
      <div>
        <EditWindow saveAvailable={this.validateForm.isValid} onSave={this.onSave} onClose={this.onClose}>
          <TextBox
            label="Старый пароль"
            type="password"
            name="oldPassword"
            autocomplete="current-password"
            value={this.state.oldPassword}
            onChange={value => {
              this.state.oldPassword = value;
            }}
            error={this.validateForm.oldPassword.error}
          />
          <TextBox
            label="Новый пароль"
            type="password"
            name="newPassword"
            autocomplete="new-password"
            value={this.state.newPassword}
            onChange={value => {
              this.state.newPassword = value;
            }}
            error={this.validateForm.newPassword.error}
          />
        </EditWindow>
      </div>
    );
  }
}
