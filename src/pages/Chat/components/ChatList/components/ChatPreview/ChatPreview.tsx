import { Component, type Props } from '@shared/NotReact';
import './ChatPreview.css';
import { type ChatsResponse } from '@api';

interface ChatPreviewProps extends Props, ChatsResponse {}

export class ChatPreview extends Component<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({}, props);
  }

  public render({ avatar, last_message, title, unread_count }: ChatPreviewProps) {
    return (
      <div className="chat-preview">
        <img className="chat-preview__avatar" src={avatar} />
        <h3 className="chat-preview__username">{title}</h3>
        <p className="chat-preview__message">{last_message.content}</p>
        <span className="chat-preview__time">{last_message.time}</span>
        {unread_count > 0 && <span className="chat-preview__counter">{unread_count}</span>}
      </div>
    );
  }
}
