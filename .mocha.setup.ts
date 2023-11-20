/// <reference path="./src/shared/lib/NotReact/jsx.d.ts" />
import { JSDOM } from 'jsdom';

const { window } = new JSDOM(``, {
  url: 'http://localhost',
});

//@ts-expect-error jsdom не мокает globalThis
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.MouseEvent = window.MouseEvent;
