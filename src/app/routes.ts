import { Auth, Login, Chat, ErrorPage, Profile } from '@pages';
import '@widgets';
import { $, Router } from '@shared';

function goToPage(initPage: () => string) {
  const $app = $('#app');
  $app.innerHTML = initPage();
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('login', () => goToPage(Login))
    .add('auth', () => goToPage(Auth))
    .add('error', () => goToPage(ErrorPage))
    .add('chat', () => goToPage(Chat))
    .add('profile', () => goToPage(Profile));

  router.go(window.location.hash);
};
