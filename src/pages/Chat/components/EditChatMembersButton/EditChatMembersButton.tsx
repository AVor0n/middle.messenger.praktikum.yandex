import { Component, type Props, type State } from '@shared/NotReact';
import { UserPreview } from './components';
import * as styles from './EditChatMembersButton.module.css';
import { type ChatUserResponse, type UserResponse, stringifyApiError } from '@api';
import { Button, EditWindow, Search, Separator } from '@uikit';
import { authService, chatService, userService } from 'services';

interface EditChatMembersButtonProps extends Props {
  chatId: number;
  className?: string;
}

interface EditChatMembersButtonState extends State {
  search: string;
  findUsers: UserResponse[];
  members: ChatUserResponse[];
  editWindowVisible?: boolean;
}

export class EditChatMembersButton extends Component<EditChatMembersButtonProps, EditChatMembersButtonState> {
  constructor(props: EditChatMembersButtonProps) {
    super({ search: '', findUsers: [], members: [] }, props);
  }

  protected init(): void {
    chatService
      .getUsersInChat({ id: this.props.chatId })
      .then(members => {
        this.state.members = members.sort((a, b) => a.login.localeCompare(b.login));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(stringifyApiError(error));
      });
  }

  onSearch = (value: string) => {
    this.state.search = value;
    userService
      .searchUsers({ login: value })
      .then(users => {
        this.state.findUsers = users;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(stringifyApiError(error));
      });
  };

  onRemoveUserFromChat = (userId: number) => {
    if (userId === authService.userInfo?.id) {
      chatService
        .deleteChat(this.props.chatId)
        .then(() => {
          this.closeEditWindow();
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(stringifyApiError(error));
        });
    }
  };

  openEditWindow = () => {
    this.state.editWindowVisible = true;
  };

  closeEditWindow = () => {
    this.state.editWindowVisible = false;
  };

  public render() {
    const filteredMembers = this.state.members.filter(
      member => !this.state.search || member.login.includes(this.state.search),
    );
    const foundUsers = this.state.findUsers;

    return (
      <div className={this.props.className}>
        <Button text="Список участников" size="xl" buttonType="ghost" $click={this.openEditWindow} />
        {this.state.editWindowVisible && (
          <EditWindow onSave={() => {}} onClose={this.closeEditWindow} contentCls={styles.window}>
            <Search onChange={this.onSearch} />
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Пользователи чата</div>
              <div className={styles.usersList}>
                {!filteredMembers.length && <span className={styles.notFound}>Ничего не найдено</span>}
                {filteredMembers.map(user => (
                  <div key={user.id.toString()}>
                    <UserPreview userData={user}>
                      <Button
                        text={user.id === authService.userInfo?.id ? 'удалить чат' : 'исключить'}
                        size="s"
                        buttonType="ghost"
                        $click={() => this.onRemoveUserFromChat(user.id)}
                      />
                    </UserPreview>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>

            {this.state.search && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Глобальный поиск</div>
                <div className={styles.usersList}>
                  {!foundUsers.length && <div className={styles.notFound}>Ничего не найдено</div>}
                  {foundUsers.map(user => (
                    <div key={user.id.toString()}>
                      <UserPreview userData={user}>
                        <Button text="добавить" size="s" buttonType="ghost" />
                      </UserPreview>
                      <Separator />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </EditWindow>
        )}
      </div>
    );
  }
}
