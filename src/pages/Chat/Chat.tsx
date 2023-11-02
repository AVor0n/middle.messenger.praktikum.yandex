import { Component, type Props, type State } from '@shared/NotReact';
import { Link } from '@shared/NotReactRouter';
import { ChatPreview } from './components';
import { chats } from './fake-data';
import { PAGES } from 'app/constants';
import './Chat.css';

interface ChatState extends State {
  message: string;
}

export class Chat extends Component<Props, ChatState> {
  constructor() {
    super(
      {
        message: '',
      },
      {},
    );
  }

  public render() {
    return (
      <div className="page chat-page">
        <div className="sidebar">
          <nav className="sidebar__tools">
            <Link href={PAGES.PROFILE} className="btn btn--ghost btn--flex btn--xl">
              Профиль
            </Link>
            <search>
              <input className="searchfield" type="search" placeholder="Поиск" />
            </search>
          </nav>
          <hr className="separator" />
          <div className="chatlist">
            {!chats.length && <p className="empty">Чатов пока нет</p>}
            {chats.map(chatData => (
              <div key={chatData.username}>
                <ChatPreview {...chatData} />
                <hr className="separator" />
              </div>
            ))}
          </div>
        </div>

        <div className="chat">
          <div className="chat__header">
            <img className="chat__avatar" src="user.svg" />
            <div className="chat__username">Github</div>
            <button className="chat__menu-btn btn btn--ghost btn--circle btn--l" />
          </div>
          <hr className="separator" />
          <div className="chat__viewer" />
          <hr className="separator" />
          <form className="chat__editor">
            <button className="chat__attach-btn btn btn--ghost btn--circle btn--l" />
            <input
              className="chat__input"
              type="text"
              placeholder="Сообщение"
              name="message"
              value={this.state.message}
              $input={e => {
                this.state.message = (e.target as HTMLInputElement).value;
              }}
            />
            <button className="chat__send-btn btn btn--primary btn--circle btn--l" disabled={!this.state.message}>
              🡒
            </button>
          </form>
        </div>
      </div>
    );
  }
}
