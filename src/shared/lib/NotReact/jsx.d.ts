import type { Component } from './Component';

type ReplaceOnPrefix<T> = {
  [K in keyof T as K extends `on${infer Event}` ? `$${Event}` : K]: T[K];
};

type JSXIntrinsicElements = {
  [tag in keyof HTMLElementTagNameMap]: Omit<Partial<ReplaceOnPrefix<HTMLElementTagNameMap[tag]>>, 'children'> & {
    children?: VElement[];
    key?: string;
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends JSXIntrinsicElements {}

    interface Element {
      tagName: string | Component;
      props: Props;
      children: VNode[];
    }
  }

  declare const createVNode: () => Element;
}
