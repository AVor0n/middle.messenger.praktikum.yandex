import data from './fake-data.json';
import { $ } from '@shared';
import { EditWindow } from '@widgets';

export function addPageHandlers() {
  $('#editDataBtn').addEventListener('click', () => {
    const $window = $('#window');

    $window.innerHTML = EditWindow({
      fields: [
        { label: 'Почта', type: 'email', value: data.email },
        { label: 'Логин', type: 'text', value: data.login },
        { label: 'Имя', type: 'text', value: data.name },
        { label: 'Фамилия', type: 'text', value: data.lastname },
        { label: 'Имя в чате', type: 'text', value: data.username },
        { label: 'Телефон', type: 'text', value: data.tel },
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
        { label: 'Пароль', type: 'password' },
        { label: 'Пароль (ещё раз)', type: 'password' },
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
