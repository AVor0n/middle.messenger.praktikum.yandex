import { Auth, Login, Chat, Error as ErrorPage, Profile } from '@pages';
import '@widgets';
import { Router } from '@shared';

function goToPage<T>(template: HandlebarsTemplateDelegate<T>, data: T, initializationCallback?: () => void) {
  const $app = document.querySelector('#app');
  if (!$app) throw new Error('Cannot find #app');

  $app.innerHTML = template(data);
  initializationCallback?.();
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('login', () => {
      goToPage(Login, {});
    })
    .add('auth', () => {
      goToPage(Auth, {});
    })
    .add('error', () => {
      goToPage(ErrorPage, {
        code: '404',
        text: 'Page Not Found',
      });
    })
    .add('chat', () => {
      goToPage(Chat, {
        chats: [
          {
            avatar: 'user.svg',
            message: 'Друзья, у меня для вас особый выпуск новостей! Важные новости',
            time: '15:12',
            unread_count: '1',
            username: 'Илья',
          },
          {
            avatar: 'user.svg',
            message: 'Круто!',
            time: '1 мая 2020',
            unread_count: 0,
            username: 'John Doe',
          },
          {
            avatar: 'user.svg',
            message: 'Круто!',
            time: 'Ср',
            unread_count: '2',
            username: '1, 3, 4',
          },
        ],
      });
    })
    .add('profile', () => {
      goToPage(Profile, {
        image: 'user.svg',
        username: 'Иван',
        name: 'Иван',
        lastname: 'Иванов',
        login: 'ivanivanov',
        email: 'pochta@ya.ru',
        tel: '+7 (909) 967 30 30',
      });
    })
    .add('', () => {
      goToPage(Login, {});
    });

  router.go(window.location.hash);
};
