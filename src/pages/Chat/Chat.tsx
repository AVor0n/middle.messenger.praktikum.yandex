import { Component } from '@shared/NotReact';
import { router } from '@shared/Router';
import { ChatHeader, ChatList } from './components';
import './Chat.css';
import { Button } from '@uikit';
import { PAGES } from 'app/constants';

export class Chat extends Component {
  constructor() {
    super({}, {});
  }

  public render() {
    return (
      <div className="page chat-page">
        <div className="sidebar">
          <nav className="sidebar__tools">
            <Button text="Профиль" buttonType="ghost" flex size="xl" $click={() => router.navigate(PAGES.PROFILE)} />
            <search>
              <input className="searchfield" type="search" placeholder="Поиск" />
            </search>
          </nav>
          <hr className="separator" />
          <ChatList />
        </div>

        <div className="chat">
          <ChatHeader />
          <hr className="separator" />
          {/* <div className="chat__viewer" /> */}
          <hr className="separator" />

          {/* <form className="chat__editor">
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
          </form> */}
        </div>
      </div>
    );
  }
}
