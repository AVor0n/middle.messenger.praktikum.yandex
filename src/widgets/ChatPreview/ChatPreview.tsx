import './ChatPreview.css';

interface ChatPreviewProps {
  username: string;
  avatar: string;
  message: string;
  time: string;
  unread_count?: number;
}
export const ChatPreview: VComponent<ChatPreviewProps> = ({ username, avatar, message, time, unread_count }) => (
  <div className="chat-preview">
    <img className="chat-preview__avatar" src={avatar} />
    <h3 className="chat-preview__username">{username}</h3>
    <p className="chat-preview__message">{message}</p>
    <span className="chat-preview__time">{time}</span>
    {unread_count && <span className="chat-preview__counter">{unread_count}</span>}
  </div>
);
