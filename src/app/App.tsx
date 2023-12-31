import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { ToastContainer, toastService } from '@shared/ToastService';
import { PAGES } from './constants';
import { stringifyApiError } from '@api';
import { Auth as AuthPage, Login as LoginPage, Chat as ChatPage, Profile as ProfilePage, ErrorPage } from '@pages';
import { authService } from 'services';

interface AppState extends State {
  content?: JSX.Element;
}

export class App extends Component<Props, AppState> {
  private navigate(component: JSX.Element, options?: { needAuth?: boolean }) {
    if (options?.needAuth && !authService.isAuthorized) {
      router.navigate(PAGES.LOGIN);
    } else {
      this.state.content = component;
    }
  }

  protected init() {
    authService
      .getUserInfo()
      .catch(error => toastService.error({ body: stringifyApiError(error) }))
      .finally(() => {
        router
          .addRoute(PAGES.AUTH, () =>
            authService.isAuthorized ? router.navigate(PAGES.CHAT) : this.navigate(<AuthPage />),
          )
          .addRoute(PAGES.LOGIN, () =>
            authService.isAuthorized ? router.navigate(PAGES.CHAT) : this.navigate(<LoginPage />),
          )
          .addRoute(PAGES.CHAT, () => this.navigate(<ChatPage />, { needAuth: true }))
          .addRoute(PAGES.PROFILE, () => this.navigate(<ProfilePage />, { needAuth: true }))
          .setNotFound(() => this.navigate(<ErrorPage code={404} />))
          .resolve();
      });
  }

  public render() {
    return (
      <div>
        {this.state.content}
        <ToastContainer />
      </div>
    );
  }
}
