import { Component, type Props, type State } from '@shared/NotReact';
import * as styles from './MessageEditor.module.css';
import { Button } from '@uikit';
import { messageService } from 'services/MessageService';

interface MessageEditorProps extends Props {
  activeChatId: number;
}

interface MessageEditorState extends State {
  message: string;
}

export class MessageEditor extends Component<MessageEditorProps, MessageEditorState> {
  constructor(props: MessageEditorProps) {
    super({ message: '' }, props);
  }

  onSendMessage = () => {
    messageService.sendMessageToChat(this.props.activeChatId, this.state.message);
    this.state.message = '';
  };

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
          $click={this.onSendMessage}
        />
      </div>
    );
  }
}
