import { Component, type Props, type State } from '@shared/NotReact';
import { Router } from '@shared/Router';
import { Auth as AuthPage, Login as LoginPage, Chat as ChatPage, Profile as ProfilePage, ErrorPage } from '@pages';

const enum Pages {
  Login = 'login',
  Auth = 'auth',
  Chat = 'chat',
  Profile = 'profile',
  NotFound = 'notFound',
  Error = 'serverError',
}

interface AppState extends State {
  page: Pages;
}

export class App extends Component<Props, AppState> {
  router = new Router();

  private navigate(page: Pages) {
    this.state.page = page;
  }

  constructor() {
    super(
      {
        page: window.location.hash as Pages,
      },
      {},
    );
  }

  protected init() {
    this.router
      .add('', () => this.navigate(Pages.Login))
      .add('login', () => this.navigate(Pages.Login))
      .add('auth', () => this.navigate(Pages.Auth))
      .add('chat', () => this.navigate(Pages.Chat))
      .add('profile', () => this.navigate(Pages.Profile))
      .add('error404', () => this.navigate(Pages.NotFound))
      .add('error500', () => this.navigate(Pages.Error));

    this.router.go(this.state.page);
  }

  public render() {
    return (
      <div>
        {this.state.page === Pages.Auth && <AuthPage />}
        {this.state.page === Pages.Login && <LoginPage />}
        {this.state.page === Pages.Chat && <ChatPage />}
        {this.state.page === Pages.Profile && <ProfilePage />}
        {this.state.page === Pages.NotFound && <ErrorPage code={404} />}
        {this.state.page === Pages.Error && <ErrorPage code={500} />}
      </div>
    );
  }
}
