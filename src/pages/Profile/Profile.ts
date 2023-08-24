import data from './fake-data.json';
import { $ } from '@shared';
import { EditWindow } from '@widgets';

export function addPageHandlers() {
  $('#editDataBtn').addEventListener('click', () => {
    const $window = $('#window');

    $window.innerHTML = EditWindow({
      fields: [
        { label: 'Почта', type: 'email', value: data.email, name: 'email' },
        { label: 'Логин', type: 'text', value: data.login, name: 'login' },
        { label: 'Имя', type: 'text', value: data.name, name: 'first_name' },
        { label: 'Фамилия', type: 'text', value: data.lastname, name: 'second_name' },
        { label: 'Имя в чате', type: 'text', value: data.username, name: 'display_name' },
        { label: 'Телефон', type: 'text', value: data.tel, name: 'phone' },
      ],
    });

    $('#editWindowSave').addEventListener('click', () => {
      $window.innerHTML = '';
    });

    $('#editWindowCancel').addEventListener('click', () => {
      $window.innerHTML = '';
    });
  });

  $('#editPasswordBtn').addEventListener('click', () => {
    const $window = $('#window');

    $window.innerHTML = EditWindow({
      fields: [
        { label: 'Пароль', type: 'password', name: 'oldPassword' },
        { label: 'Пароль (ещё раз)', type: 'password', name: 'newPassword' },
      ],
    });

    $('#editWindowSave').addEventListener('click', () => {
      $window.innerHTML = '';
    });

    $('#editWindowCancel').addEventListener('click', () => {
      $window.innerHTML = '';
    });
  });
}
