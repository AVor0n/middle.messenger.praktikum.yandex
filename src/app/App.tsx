import { Component, type Props, type State } from '@shared/NotReact';
import { router } from '@shared/Router';
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
    router
      .addRoute('/', () => this.navigate(Pages.Login))
      .addRoute('/login', () => this.navigate(Pages.Login))
      .addRoute('/auth', () => this.navigate(Pages.Auth))
      .addRoute('/chat', () => this.navigate(Pages.Chat))
      .addRoute('/profile', () => this.navigate(Pages.Profile))
      .setNotFound(() => this.navigate(Pages.NotFound))
      .resolve();
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
