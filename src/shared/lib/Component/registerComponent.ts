import Handlebars from 'handlebars';
import type { ComponentConstructor, RegisterHelperOptions } from './types';

function registerComponentHelper(
  this: unknown,
  Component: ComponentConstructor,
  { hash, data, fn }: RegisterHelperOptions,
) {
  const component = new Component(hash);
  const dataAttribute = `data-id="${component.id}"`;
  const { root } = data;
  if (!root.__refs) {
    root.__refs = {};
  }
  if (!root.__children) {
    root.__children = [];
  }

  if (hash.ref) {
    root.__refs[hash.ref] = component;
  }

  root.__children.push({
    component,
    embed(fragment: DocumentFragment) {
      const stub = fragment.querySelector(`[${dataAttribute}]`);

      if (!stub) {
        return;
      }

      const element = component.getContent();
      if (element) {
        element.append(...Array.from(stub.childNodes));
        stub.replaceWith(element);
      }
    },
  });

  const contents = fn ? fn(this) : '';

  return `<div ${dataAttribute}>${contents}</div>`;
}

export function registerComponent(name: string, component: ComponentConstructor) {
  if (name in Handlebars.helpers) {
    throw Error(`Компонент '${name}' уже зарегистрирован!`);
  }
  Handlebars.registerHelper(name, (args: RegisterHelperOptions) => registerComponentHelper(component, args));
}
