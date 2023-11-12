import { Component, type Props, type State } from '@shared/NotReact';
import * as styles from './MessageEditor.module.css';
import { Button } from '@uikit';

interface MessageEditorState extends State {
  message: string;
}

export class MessageEditor extends Component<Props, MessageEditorState> {
  constructor(props: Props) {
    super({ message: '' }, props);
  }

  public render() {
    return (
      <div className={styles.container}>
        {/* <Button text="📎" size="l" circle buttonType="ghost" className={styles.attachBtn} disabled /> */}
        <input
          className={styles.input}
          type="text"
          placeholder="Введите сообщение для отправки"
          name="message"
          value={this.state.message}
          $input={e => {
            this.state.message = (e.target as HTMLInputElement).value;
          }}
        />
        <Button
          text="🡒"
          disabled={!this.state.message}
          size="l"
          circle
          buttonType="primary"
          title="отправить"
          className={styles.sendBtn}
        />
      </div>
    );
  }
}
