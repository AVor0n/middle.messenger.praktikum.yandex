import { Component, type Props, type State } from '@shared/NotReact';
import { toastService } from '@shared/ToastService';
import { Message } from './components';
import * as styles from './MessageList.module.css';
import { messageDtoToMessageProps } from './utils';
import { stringifyApiError } from '@api';
import { authService, chatService } from 'services';
import { type MessageDto, messageService } from 'services/MessageService';

interface MessageListState extends State {
  isLoading: boolean;
  messages: { time: string; content: string; authorName: string; authorId: number }[];
}

interface MessageListProps extends Props {
  activeChatId: number;
}

export class MessageList extends Component<MessageListProps, MessageListState> {
  memberNames: Record<string, string> = {};

  noMoreOldMessages = false;

  needScrollToNewMessages = true;

  scrollHeight = 0;

  constructor(props: MessageListProps) {
    super({ messages: [], isLoading: true }, props);
  }

  loadOldMessages = async (chatId: number) => {
    try {
      const messages = await messageService.getUnreadMessagesInChat(chatId, this.state.messages.length);
      const oldMessages = messages.toReversed().map(message => messageDtoToMessageProps(message, this.memberNames));

      this.setState({ isLoading: false, messages: [...oldMessages, ...this.state.messages] });
      this.noMoreOldMessages = oldMessages.length === 0;
    } catch (error) {
      toastService.error({ body: stringifyApiError(error) });
    }
  };

  resetComponentState = () => {
    this.needScrollToNewMessages = true;
    this.setState({
      messages: [],
      isLoading: true,
    });
  };

  scrollToNewMessages = () => {
    const lastMessageElement = this.ref?.lastChild;
    if (lastMessageElement instanceof HTMLElement) {
      lastMessageElement.scrollIntoView();
      this.needScrollToNewMessages = false;
    }
  };

  handleScroll = async (e: Event) => {
    this.scrollHeight = (this.ref as HTMLDivElement).scrollHeight;
    const { scrollTop } = e.target as HTMLDivElement;
    if (scrollTop > 0 || this.state.isLoading || this.noMoreOldMessages) return;
    this.setState({ isLoading: true });
    await this.loadOldMessages(this.props.activeChatId);
  };

  handleReceiveMessage = (message: MessageDto) => {
    this.state.messages = [...this.state.messages, messageDtoToMessageProps(message, this.memberNames)];
  };

  updateChatMembersNames = async (chatId: number) => {
    try {
      const members = await chatService.getUsersInChat({ id: chatId });
      members.forEach(member => {
        this.memberNames[member.id] = member.login;
      });
    } catch (error) {
      toastService.error({ body: stringifyApiError(error) });
    }
  };

  protected async init() {
    await this.updateChatMembersNames(this.props.activeChatId);
    await this.loadOldMessages(this.props.activeChatId);
    messageService.on('getMessage', this.handleReceiveMessage);
  }

  protected async componentWillUpdate(_oldProps: MessageListProps, newProps: MessageListProps) {
    await this.updateChatMembersNames(this.props.activeChatId);
    await this.loadOldMessages(newProps.activeChatId);
  }

  protected componentDidUpdate(oldProps: MessageListProps, newProps: MessageListProps): void {
    const listContainer = this.ref as HTMLDivElement | null;
    if (listContainer) {
      listContainer.scrollTop += listContainer.scrollHeight - this.scrollHeight;
    }
    if (this.needScrollToNewMessages) {
      this.scrollToNewMessages();
    }
    if (oldProps.activeChatId !== newProps.activeChatId) {
      this.resetComponentState();
    }
  }

  protected shouldComponentUpdate(oldProps: MessageListProps, newProps: MessageListProps) {
    return oldProps.activeChatId !== newProps.activeChatId;
  }

  public render() {
    const currentUserId = authService.userInfo?.id;

    return (
      <div className={styles.list} $scroll={this.handleScroll}>
        {this.state.messages.map(message => (
          <Message {...message} income={message.authorId !== currentUserId} />
        ))}
      </div>
    );
  }
}
