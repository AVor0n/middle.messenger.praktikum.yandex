import { Component, type Props, type State } from '@shared/NotReact';
import { toastService } from '@shared/ToastService';
import { Message } from './components';
import * as styles from './MessageList.module.css';
import { stringifyApiError } from '@api';
import { authService, chatService } from 'services';
import { messageService } from 'services/MessageService';

interface MessageListState extends State {
  messages: { time: string; content: string; authorName: string; authorId: number }[];
}

interface MessageListProps extends Props {
  activeChatId: number;
}

export class MessageList extends Component<MessageListProps, MessageListState> {
  constructor(props: MessageListProps) {
    super({ messages: [] }, props);
  }

  datetimeFormatter = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  getMessages = (chatId: number) => {
    Promise.all([messageService.getUnreadMessagesInChat(chatId), chatService.getUsersInChat({ id: chatId })])
      .then(([messages, members]) => {
        const memberNames = members.reduce((acc: Record<string, string>, member) => {
          acc[member.id] = member.login;
          return acc;
        }, {});
        this.state.messages = messages.toReversed().map(message => ({
          authorId: message.user_id,
          authorName: memberNames[message.user_id],
          content: message.content,
          time: this.datetimeFormatter(message.time),
        }));
      })
      .catch(error => {
        toastService.error({ body: stringifyApiError(error) });
      });
  };

  protected init(): void {
    this.getMessages(this.props.activeChatId);
  }

  protected componentWillUpdate(_oldProps: MessageListProps, newProps: MessageListProps) {
    this.getMessages(newProps.activeChatId);
  }

  protected componentDidUpdate() {
    const lastMessageElement = this.ref?.lastChild;
    if (lastMessageElement instanceof HTMLElement) {
      lastMessageElement.scrollIntoView();
    }
  }

  protected shouldComponentUpdate(oldProps: MessageListProps, newProps: MessageListProps) {
    return oldProps.activeChatId !== newProps.activeChatId;
  }

  public render() {
    const currentUserId = authService.userInfo?.id;

    return (
      <div className={styles.list}>
        {this.state.messages.map(message => (
          <Message {...message} income={message.authorId !== currentUserId} />
        ))}
      </div>
    );
  }
}
