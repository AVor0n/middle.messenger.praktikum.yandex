import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { PAGES } from './constants';
import { Auth as AuthPage, Login as LoginPage, Chat as ChatPage, Profile as ProfilePage, ErrorPage } from '@pages';
import { authService } from 'services';

interface AppState extends State {
  content?: JSX.Element;
}

export class App extends Component<Props, AppState> {
  private navigate(component: JSX.Element, options?: { needAuth?: boolean }) {
    if (options?.needAuth && !authService.isAuthorized) {
      this.navigate(<LoginPage />);
    } else {
      this.state.content = component;
    }
  }

  protected init() {
    authService
      .getUserInfo()
      .catch(() => {})
      .finally(() => {
        router
          .addRoute(PAGES.AUTH, () => this.navigate(<AuthPage />))
          .addRoute(PAGES.LOGIN, () => this.navigate(<ChatPage />, { needAuth: true }))
          .addRoute(PAGES.CHAT, () => this.navigate(<ChatPage />, { needAuth: true }))
          .addRoute(PAGES.PROFILE, () => this.navigate(<ProfilePage />, { needAuth: true }))
          .setNotFound(() => this.navigate(<ErrorPage code={404} />))
          .navigate(window.location.pathname);
      });
  }

  public render() {
    return <div>{this.state.content}</div>;
  }
}
