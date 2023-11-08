import { router } from '@shared/Router';
import { AuthApi, type SignUpRequest, type SignInRequest } from '@api';
import { PAGES } from 'app/constants';

class AuthService {
  private authApi = new AuthApi();

  async auth(data: SignUpRequest) {
    await this.authApi.signupCreate(data);
    router.navigate(PAGES.CHAT);
  }

  async login(data: SignInRequest) {
    await this.authApi.signinCreate(data);
    router.navigate(PAGES.CHAT);
  }

  async logout() {
    await this.authApi.logoutCreate();
    router.navigate(PAGES.AUTH);
  }

  async getUserInfo() {
    return this.authApi.userList();
  }
}

export const authService = new AuthService();
