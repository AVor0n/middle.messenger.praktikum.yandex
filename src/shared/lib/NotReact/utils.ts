import type { Component } from './Component';
import type { VNode } from './types';

export const printVDom = (node?: VNode) => {
  if (!node) {
    // eslint-disable-next-line no-console
    console.log('empty vNode');
  }
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(node, null, 2));
};

export const isComponent = (value: unknown): value is Component => typeof value === 'object';
