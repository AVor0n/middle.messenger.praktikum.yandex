import './Textbox.css';

export interface TextBoxProps {
  value?: string;
  name?: string;
  label: string;
  error?: string;
  type: HTMLInputElement['type'];
}

export const TextBox: VComponent<TextBoxProps> = ({ label, error, type, name, value }) => (
  <div className="textbox">
    <label>
      <input type={type} className="textbox__input" placeholder={label} value={value} name={name} />
      <div className="textbox__label">{label}</div>
    </label>
    <div className="textbox__error">{error}</div>
  </div>
);
