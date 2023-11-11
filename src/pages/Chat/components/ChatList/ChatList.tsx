import { Component, type Props } from '@shared/NotReact';
import { ChatPreview } from './components';
import { chatService } from 'services';

export class ChatList extends Component {
  constructor(props: Props) {
    super({}, props);
  }

  public render() {
    const chats = chatService.chatList;

    return (
      <div className="chatlist">
        {!chats.length && <p className="empty">Чатов пока нет</p>}
        {chats.map(chat => (
          <div key={String(chat.id)}>
            <ChatPreview {...chat} />
            <hr className="separator" />
          </div>
        ))}
      </div>
    );
  }
}
