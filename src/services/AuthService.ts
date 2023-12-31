import { EventBus, onChangeEvent } from '@shared/EventBus';
import { router } from '@shared/Router';
import {
  AuthApi,
  type SignUpRequest,
  type SignInRequest,
  type UserResponse,
  UserApi,
  type ChangePasswordRequest,
  type UserUpdateRequest,
} from '@api';
import { PAGES } from 'app/constants';

class AuthService extends EventBus<{ updateUserInfo: (userInfo?: UserResponse) => void }> {
  private authApi = new AuthApi();

  private userApi = new UserApi();

  @onChangeEvent('updateUserInfo')
  private accessor _userInfo: UserResponse | undefined;

  public get userInfo() {
    return this._userInfo;
  }

  public get isAuthorized() {
    return !!this._userInfo;
  }

  public auth = async (data: SignUpRequest) => {
    await this.authApi.signupCreate(data);
    router.navigate(PAGES.CHAT);
  };

  public login = async (data: SignInRequest) => {
    await this.authApi.signinCreate(data);
    await this.getUserInfo();
    router.resolve();
  };

  public logout = async () => {
    await this.authApi.logoutCreate();
    this._userInfo = undefined;
    router.navigate(PAGES.LOGIN);
  };

  public getUserInfo = async () => {
    this._userInfo = await this.authApi.userList();
    return this.getUserInfo;
  };

  public updateProfile = async (data: UserUpdateRequest) => {
    this._userInfo = await this.userApi.profileUpdate(data);
    return this.getUserInfo;
  };

  public updatePassword = async (data: ChangePasswordRequest) => {
    await this.userApi.passwordUpdate(data);
  };

  public updateAvatar = async (avatar: File) => {
    this._userInfo = await this.userApi.profileAvatarUpdate({ avatar });
    return this.getUserInfo;
  };
}

export const authService = new AuthService();
