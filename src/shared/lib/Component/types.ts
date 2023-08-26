import type { Component } from './Component';

export interface Child {
  component: Component;
  embed: (fragment: DocumentFragment) => void;
}

export interface Props {
  [key: string]: unknown;
  events: Record<string, () => void>;
}

export interface TemplateContext {
  [key: string]: unknown;
  __children?: Child[];
  __refs: Record<string, Component>;
}
