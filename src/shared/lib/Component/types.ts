import type { Component } from './Component';
import type { HelperOptions } from 'handlebars';

export interface Child {
  component: Component;
  embed: (fragment: DocumentFragment) => void;
}

export interface Props {
  [key: string]: unknown;
  events: Record<string, () => void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor<T extends unknown[] = any> = new (...args: T) => Component;

export interface TemplateContext {
  [key: string]: unknown;
  __children?: Child[];
  __refs: Record<string, Component>;
}

export interface RegisterHelperOptions extends Partial<HelperOptions> {
  data: { root: Partial<TemplateContext> };
  hash: {
    ref?: string;
  };
}
