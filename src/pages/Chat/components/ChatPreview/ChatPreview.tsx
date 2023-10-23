import { Component } from '@shared';
import type { Props } from '@shared';
import './ChatPreview.css';

interface ChatPreviewProps extends Props {
  username: string;
  avatar: string;
  message: string;
  time: string;
  unread_count?: number;
}

export class ChatPreview extends Component<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super({}, props);
  }

  public render({ username, avatar, message, time, unread_count }: ChatPreviewProps) {
    return (
      <div className="chat-preview">
        <img className="chat-preview__avatar" src={avatar} />
        <h3 className="chat-preview__username">{username}</h3>
        <p className="chat-preview__message">{message}</p>
        <span className="chat-preview__time">{time}</span>
        {unread_count && <span className="chat-preview__counter">{unread_count}</span>}
      </div>
    );
  }
}
