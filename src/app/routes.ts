import { Auth, Chat, ErrorPage, Login, Profile } from '@pages';
import '@widgets';
import { $, Router, type Component } from '@shared';

function goToPage(page: Component) {
  const root = $('#app');
  root.innerHTML = '';
  const pageContent = page.getContent();
  if (pageContent) {
    root.append(pageContent);
  }

  page.dispatchComponentDidMount();
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('', () => goToPage(new Login()))
    .add('login', () => goToPage(new Login()))
    .add('auth', () => goToPage(new Auth()))
    .add('chat', () => goToPage(new Chat()))
    .add('profile', () => goToPage(new Profile()))
    .add('error404', () => goToPage(new ErrorPage(404)))
    .add('error500', () => goToPage(new ErrorPage(500)));

  router.go(window.location.hash);
};
