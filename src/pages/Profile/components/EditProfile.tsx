import {
  Component,
  type Props,
  type State,
  validate,
  required,
  removeProxy,
  email,
  login,
  onlyLetters,
  firstUpperLetter,
  phone,
} from '@shared';
import { TextBox } from '@uikit';
import { EditWindow } from '@widgets';
import type { ProfileInfo } from '../type';

interface EditProfileWindowProps extends Props {
  data: ProfileInfo;
  onSave: (data: ProfileInfo) => void;
  onClose: () => void;
}

interface EditProfileWindowState extends State, ProfileInfo {}

export class EditProfileWindow extends Component<EditProfileWindowProps, EditProfileWindowState> {
  constructor(props: EditProfileWindowProps) {
    super({ ...props.data }, props);
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

  private onSave = (e: Event) => {
    e.preventDefault();
    const newProfileInfo = removeProxy(this.state);
    // eslint-disable-next-line no-console
    console.log(newProfileInfo);
    this.props.onSave(newProfileInfo);
    this.props.onClose();
  };

  private onClose = (e: Event) => {
    e.preventDefault();
    this.props.onClose();
  };

  public render() {
    const fields: { label: string; name: keyof ProfileInfo; type?: HTMLInputElement['type'] }[] = [
      { label: 'Почта', name: 'email', type: 'email' },
      { label: 'Логин', name: 'login' },
      { label: 'Имя', name: 'first_name' },
      { label: 'Фамилия', name: 'second_name' },
      { label: 'Имя в чате', name: 'display_name' },
      { label: 'Телефон', name: 'phone' },
    ];

    return (
      <div>
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
      </div>
    );
  }
}
