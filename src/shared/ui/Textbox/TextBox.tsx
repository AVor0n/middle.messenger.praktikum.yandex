import { Component, type Props, type State } from '@shared/NotReact';
import './Textbox.css';

interface TextBoxState extends State {
  visited: boolean;
}

export interface TextBoxProps extends Props, Partial<Omit<HTMLInputElement, 'children'>> {
  label: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export class TextBox extends Component<TextBoxProps, TextBoxState> {
  constructor(props: TextBoxProps) {
    super(
      {
        visited: false,
      },
      props,
    );
  }

  public render({ type, label, error, name, value, onChange, onBlur, ...props }: TextBoxProps) {
    return (
      <div className="textbox">
        <label>
          <input
            type={type}
            className="textbox__input"
            placeholder={label}
            value={value}
            name={name}
            $input={e => onChange?.((e.target as HTMLInputElement).value)}
            $blur={() => {
              this.state.visited = true;
              onBlur?.();
            }}
            {...props}
          />
          <div className="textbox__label">{label}</div>
        </label>
        {this.state.visited && <div className="textbox__error">{error}</div>}
      </div>
    );
  }
}
