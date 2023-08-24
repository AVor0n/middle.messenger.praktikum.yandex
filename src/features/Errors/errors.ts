export const addErrorLinks = () => {
  const parser = new DOMParser();
  const $errorsBlock = parser.parseFromString(
    `
    <div class="error_btns">
      <a class="btn btn--ghost btn--flex btn--xl btn--danger" href="#/error404">Получить ошибку 404</a>
      <a class="btn btn--ghost btn--flex btn--xl btn--danger" href="#/error500">Получить ошибку 500</a>
    </div>
  `,
    'text/html',
  );
  document.body.append(...$errorsBlock.body.childNodes);
};
