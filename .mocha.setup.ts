/// <reference path="./src/shared/lib/NotReact/jsx.d.ts" />
import { JSDOM, VirtualConsole } from 'jsdom';

const { window } = new JSDOM(``, {
  url: 'http://localhost',
});

//@ts-expect-error jsdom не мокает globalThis
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.MouseEvent = window.MouseEvent;

// удаление предупреждений о том, что jsdom не реализовал navigation
// https://github.com/jsdom/jsdom/issues/2112
const listeners = window._virtualConsole.listeners('jsdomError');
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners('jsdomError');
window._virtualConsole.addListener('jsdomError', error => {
  if (
    error.type !== 'not implemented' &&
    error.message !== 'Not implemented: navigation (except hash changes)' &&
    originalListener
  ) {
    originalListener(error);
  }
});

declare global {
  interface Window {
    _virtualConsole: VirtualConsole;
  }
}
