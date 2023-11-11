import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import * as styles from './Chat.module.css';
import { ChatHeader, ChatList, MessageList } from './components';
import { Button, Separator } from '@uikit';
import { PAGES } from 'app/constants';

interface ChatState extends State {
  activeChatId?: number;
}

export class Chat extends Component<Props, ChatState> {
  constructor() {
    super({}, {});
  }

  public render() {
    return (
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <nav className={styles.sidebarTools}>
            <Button text="Профиль" buttonType="ghost" flex size="xl" $click={() => router.navigate(PAGES.PROFILE)} />
            <search>
              <input className={styles.search} type="search" placeholder="Поиск" />
            </search>
          </nav>
          <Separator />
          <ChatList />
        </div>

        <div className={styles.chat}>
          <ChatHeader />
          <Separator />

          <MessageList />
          <Separator />

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
