import { Component, type State } from '@shared/NotReact';
import { toastService } from '@shared/ToastService';
import * as styles from './CreateChatButton.module.css';
import { stringifyApiError } from '@api';
import { Button, EditWindow, TextBox } from '@uikit';
import { chatService, messageService } from 'services';

interface CreateChatButtonState extends State {
  chatTitle: string;
  createWindowVisible?: boolean;
}

interface CreateChatButtonProps extends State {
  cls?: string;
}

export class CreateChatButton extends Component<CreateChatButtonProps, CreateChatButtonState> {
  constructor(props: CreateChatButtonProps) {
    super({ chatTitle: '' }, props);
  }

  createChat = () => {
    chatService
      .createChat({ title: this.state.chatTitle })
      .then(chatList => {
        this.closeCreateWindow();
        return Promise.all(chatList.map(chat => messageService.connect(chat.id)));
      })
      .catch(error => {
        toastService.error({ body: stringifyApiError(error) });
      });
  };

  openCreateWindow = () => {
    this.state.createWindowVisible = true;
  };

  closeCreateWindow = () => {
    this.state.createWindowVisible = false;
  };

  public render() {
    return (
      <div className={this.props.cls}>
        <Button text="Создать чат" buttonType="primary" size="xl" flex $click={this.openCreateWindow} />
        {this.state.createWindowVisible && (
          <EditWindow saveAvailable={!!this.state.chatTitle} onSave={this.createChat} onClose={this.closeCreateWindow}>
            <h1 className={styles.windowTitle}>Введите название нового чата</h1>
            <TextBox
              label="Название чата"
              value={this.state.chatTitle}
              onChange={value => {
                this.state.chatTitle = value;
              }}
            />
          </EditWindow>
        )}
      </div>
    );
  }
}
