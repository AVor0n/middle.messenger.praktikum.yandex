import { Component, type Props, type State } from '@shared/NotReact';
import { toastService } from '@shared/ToastService';
import { UserPreview } from './components';
import * as styles from './EditChatMembersButton.module.css';
import { type UserPreviewData, chatUserResponseToChatPreviewData, userResponseToChatPreviewData } from './types';
import { stringifyApiError } from '@api';
import { Button, EditWindow, Search, Separator } from '@uikit';
import { authService, chatService, messageService, userService } from 'services';

interface EditChatMembersButtonProps extends Props {
  chatId: number;
  className?: string;
  resetActiveChat: () => void;
}

interface EditChatMembersButtonState extends State {
  search: string;
  foundUsers: UserPreviewData[];
  members: UserPreviewData[];
  editWindowVisible?: boolean;
}

export class EditChatMembersButton extends Component<EditChatMembersButtonProps, EditChatMembersButtonState> {
  constructor(props: EditChatMembersButtonProps) {
    super({ search: '', foundUsers: [], members: [] }, props);
  }

  getChatMembersList = (chatId: number) => {
    chatService
      .getUsersInChat({ id: chatId })
      .then(members => {
        this.state.members = members
          .map(chatUserResponseToChatPreviewData)
          .sort((a, b) => a.login.localeCompare(b.login));
      })
      .catch(error => {
        toastService.error({ body: stringifyApiError(error) });
      });
  };

  protected init() {
    this.getChatMembersList(this.props.chatId);
  }

  protected componentWillUpdate(_oldProps: EditChatMembersButtonProps, newProps: EditChatMembersButtonProps) {
    this.getChatMembersList(newProps.chatId);
  }

  protected shouldComponentUpdate(_oldProps: EditChatMembersButtonProps, newProps: EditChatMembersButtonProps) {
    return _oldProps.chatId !== newProps.chatId;
  }

  onSearch = (value: string) => {
    this.state.search = value;
    userService
      .searchUsers({ login: value })
      .then(users => {
        this.state.foundUsers = users
          .map(userResponseToChatPreviewData)
          .filter(user => !this.state.members.find(member => member.id === user.id));
      })
      .catch(error => {
        toastService.error({ body: stringifyApiError(error) });
      });
  };

  onRemoveUserFromChat = async (userId: number) => {
    try {
      if (userId === authService.userInfo?.id) {
        messageService.disconnect(this.props.chatId);
        await chatService.deleteChat(this.props.chatId);
        this.closeEditWindow();
        this.props.resetActiveChat();
      } else {
        await chatService.deleteUsersFromChat({ chatId: this.props.chatId, users: [userId] });
        const user = this.state.members.find(member => member.id === userId);
        if (!user) return;
        this.setState({
          members: this.state.members.filter(member => member.id !== userId),
          foundUsers: [...this.state.foundUsers, user],
        });
      }
    } catch (error) {
      toastService.error({ body: stringifyApiError(error) });
    }
  };

  onAddUserToChat = async (userId: number) => {
    try {
      await chatService.addUsersToChat({ chatId: this.props.chatId, users: [userId] });
      const user = this.state.foundUsers.find(foundUser => foundUser.id === userId);
      if (!user) return;
      const newState = {
        members: [...this.state.members, user],
        foundUsers: this.state.foundUsers.filter(foundUser => foundUser.id !== userId),
      };
      this.setState(newState);
    } catch (error) {
      toastService.error({ body: stringifyApiError(error) });
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
    const { foundUsers } = this.state;

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
                        <Button
                          text="добавить"
                          size="s"
                          buttonType="ghost"
                          $click={() => this.onAddUserToChat(user.id)}
                        />
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
