import { Auth, Login, Chat, Profile, ErrorPage } from '@pages';
import '@widgets';
import { $, Router } from '@shared';

function goToPage(initPage: () => string) {
  const $app = $('#app');
  $app.innerHTML = initPage();
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('', () => goToPage(Login))
    .add('login', () => goToPage(Login))
    .add('auth', () => goToPage(Auth))
    .add('chat', () => goToPage(Chat))
    .add('profile', () => goToPage(Profile))
    .add('error404', () => goToPage(() => ErrorPage(404)))
    .add('error500', () => goToPage(() => ErrorPage(500)));

  router.go(window.location.hash);
};
