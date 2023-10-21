import { Component } from '@shared';
import type { Props } from '@shared';
import './Textbox.css';

export interface TextBoxProps extends Props {
  value?: string;
  name?: string;
  label: string;
  error?: string;
  type: HTMLInputElement['type'];
}

export class TextBox extends Component<TextBoxProps> {
  constructor(props: TextBoxProps) {
    super({}, props);
  }

  public render({ type, label, error, name, value }: TextBoxProps) {
    return (
      <div className="textbox">
        <label>
          <input type={type} className="textbox__input" placeholder={label} value={value} name={name} />
          <div className="textbox__label">{label}</div>
        </label>
        <div className="textbox__error">{error}</div>
      </div>
    );
  }
}
