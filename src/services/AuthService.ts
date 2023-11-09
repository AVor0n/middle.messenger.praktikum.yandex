import { router } from '@shared/Router';
import { AuthApi, type SignUpRequest, type SignInRequest, type UserResponse } from '@api';
import { PAGES } from 'app/constants';

class AuthService {
  private authApi = new AuthApi();

  private _userInfo?: UserResponse;

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
}

export const authService = new AuthService();
