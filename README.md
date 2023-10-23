# Messenger

## Описание

Один из учебных проектов курса [Мидл фронтенд разработчик](https://practicum.yandex.ru/middle-frontend/)

### Sprint 1

- Выполнена настройка проекта
- Сверстаны основные страницы с помощью [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
  - [Логин](https://cosmic-lokum-a24ea1.netlify.app/#/login)
  - [Авторизация](https://cosmic-lokum-a24ea1.netlify.app/#/auth)
  - [Список чатов](https://cosmic-lokum-a24ea1.netlify.app/#/chat)
  - [Профиль](https://cosmic-lokum-a24ea1.netlify.app/#/profile)
  - [Ошибка 404](https://cosmic-lokum-a24ea1.netlify.app/#/error404)
  - [Ошибка 500](https://cosmic-lokum-a24ea1.netlify.app/#/error500)
- Добавлен [express](https://expressjs.com/ru/) сервер для раздачи статики
- Выполнен [деплой на Netlify](https://cosmic-lokum-a24ea1.netlify.app/)

### Sprint 2

- Реализован класс EventBus
- Реализован класс Component с отслеживаемым состоянием и жизненым циклом
- Реализован virtual dom, добавлена поддержка JSX
- Отказ от handlebars в пользу своего шаблонизатора
- Создан объект httpService с методами для работы с запросами
- В формы добавлена валидация
- Выполнен [деплой на Netlify](https://ephemeral-donut-2bacb2.netlify.app/)

## Полезные ссылки

- [макет](<https://www.figma.com/file/frISC71Cb5rSRThFw5DCLb/Chat_external_link-(Copy)?node-id=1%3A502&mode=dev>) взятый за основу
- [деплой (Netlify)](https://ephemeral-donut-2bacb2.netlify.app/)

## Доступные скрипты

- `yarn install` — установка зависимостей,
- `yarn start` — запуск express сервера для просмотра результата,
- `yarn dev` — запуск vite dev-сервера для разработки,

- `yarn build` — сборка стабильной версии.
- `yarn lint` — линтинг и проверка типов.
- `yarn lint:fix` — автоправка ошибок линтера.
- `yarn format` — проверка форматирования кода.
- `yarn format:fix` — автоправка форматирования.
- `yarn test` — запуск тестов.
- `yarn coverage` — открытие UI для тестов, отчет о покрытии.
