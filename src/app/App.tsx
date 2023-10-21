import { userInfo } from './fake-data';
import { Auth as AuthPage, Login as LoginPage, Chat as ChatPage, Profile as ProfilePage, ErrorPage } from '@pages';
import { Component, Router } from '@shared';
import type { Props, State } from '@shared';

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
  private router: Router;

  private navigate = (page: Pages) => {
    this.state.page = page;
  };

  constructor() {
    super(
      {
        page: window.location.hash as Pages,
      },
      {},
    );

    this.router = new Router()
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
    switch (this.state.page) {
      case Pages.Auth:
        return <AuthPage />;
      case Pages.Login:
        return <LoginPage />;
      case Pages.Chat:
        return <ChatPage />;
      case Pages.Profile:
        return <ProfilePage {...userInfo} />;
      case Pages.NotFound:
        return <ErrorPage code={404} />;
      case Pages.Error:
        return <ErrorPage code={500} />;
      default:
        return <ErrorPage code={404} />;
    }
  }
}
