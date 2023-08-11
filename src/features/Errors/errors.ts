import { ErrorPage } from '@pages';
import { $ } from '@shared';

const errors = [
  {
    code: 404,
    text: 'Страница не найдена',
  },
  {
    code: 500,
    text: 'Уже чиним',
  },
];

const createErrorBtn = (code: number, text: string) => {
  const $btn = document.createElement('button');
  $btn.classList.add('btn', 'btn--ghost', 'btn--flex', 'btn--xl', 'btn--danger');
  $btn.textContent = `Получить ошибку ${code}`;

  $btn.addEventListener('click', () => {
    $('#app').innerHTML = ErrorPage({ code, text });
  });

  return $btn;
};

const createErrorBtnsContainer = () => {
  const $errorLinks = document.createElement('div');
  $errorLinks.classList.add('errors_nav');
  return $errorLinks;
};

export const addErrorLinks = () => {
  const $errorBtns = errors.map(({ code, text }) => createErrorBtn(code, text));
  const $errorLinks = createErrorBtnsContainer();

  $errorLinks.append(...$errorBtns);
  document.body.append($errorLinks);
};
