import { Component, type Props, type State } from '@shared/NotReact';
import { toastService } from '@shared/ToastService';
import { stringifyApiError } from '@api';
import { messageService } from 'services/MessageService';

interface MessageListState extends State {
  messages: { time: string; content: string }[];
}

interface MessageListProps extends Props {
  activeChatId: number;
}

export class MessageList extends Component<MessageListProps, MessageListState> {
  constructor(props: MessageListProps) {
    super({ messages: [] }, props);
  }

  getMessages = (chatId: number) => {
    messageService
      .getUnreadMessagesInChat(chatId)
      .then(messages => {
        this.state.messages = messages;
      })
      .catch(error => {
        toastService.error({ body: stringifyApiError(error) });
      });
  };

  protected init(): void {
    this.getMessages(this.props.activeChatId);
  }

  protected componentWillUpdate(_oldProps: MessageListProps, newProps: MessageListProps): void {
    this.getMessages(newProps.activeChatId);
  }

  protected shouldComponentUpdate(oldProps: MessageListProps, newProps: MessageListProps): boolean {
    return oldProps.activeChatId !== newProps.activeChatId;
  }

  public render() {
    return (
      <div>
        {this.state.messages.map(message => (
          <div key={message.time}>
            <span>{message.content}</span>
            <span>{message.time}</span>
          </div>
        ))}
      </div>
    );
  }
}
