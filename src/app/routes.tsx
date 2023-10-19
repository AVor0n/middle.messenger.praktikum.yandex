import '@widgets';
import { userInfo } from './fake-data';
import { Auth, Chat, ErrorPage, Login, Profile } from '@pages';
import { $, Router, render } from '@shared';

const root = $('#app');
function goToPage(page: VElement) {
  render(page, root);
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('', () => goToPage(<Login />))
    .add('login', () => goToPage(<Login />))
    .add('auth', () => goToPage(<Auth />))
    .add('chat', () => goToPage(<Chat />))
    .add('profile', () => goToPage(<Profile {...userInfo} />))
    .add('error404', () => goToPage(<ErrorPage code={404} />))
    .add('error500', () => goToPage(<ErrorPage code={500} />));

  router.go(window.location.hash);
};
