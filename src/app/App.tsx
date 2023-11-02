import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
import { PAGES } from './constants';
import { Auth as AuthPage, Login as LoginPage, Chat as ChatPage, Profile as ProfilePage, ErrorPage } from '@pages';

interface AppState extends State {
  content: JSX.Element | null;
}

export class App extends Component<Props, AppState> {
  private navigate(component: JSX.Element) {
    this.state.content = component;
  }

  constructor() {
    super({ content: null }, {});
  }

  protected init() {
    router
      .addRoute(PAGES.LOGIN, () => this.navigate(<LoginPage />))
      .addRoute(PAGES.AUTH, () => this.navigate(<AuthPage />))
      .addRoute(PAGES.CHAT, () => this.navigate(<ChatPage />))
      .addRoute(PAGES.PROFILE, () => this.navigate(<ProfilePage />))
      .setNotFound(() => this.navigate(<ErrorPage code={404} />))
      .resolve();
  }

  public render() {
    return <div>{this.state.content}</div>;
  }
}
