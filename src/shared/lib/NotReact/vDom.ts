/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isComponent } from './utils';
import type { Component, ComponentConstructor } from './Component';
import type { DOMNode, Props, State, VElement, VNode } from './types';
/* eslint-disable new-cap */
export const componentsToDOM = new Map<string, HTMLElement>();

export function createVNode(
  tagName: string | ComponentConstructor,
  props: State = {},
  ...childElements: VNode[]
): VElement {
  const children = childElements.flat().filter(Boolean);
  try {
    return {
      tagName: typeof tagName === 'function' ? new tagName({ ...props, children }) : tagName,
      props,
      children,
    };
  } catch {
    throw new Error(`При построении vDom встретился объект отличный от Component или JSX.Element`);
  }
}

/**
 * Создает DOM элемент на основе его VDOM представления
 * @param vNode vDOM представление элемента
 */
export function createDOMNode(vNode: VNode): DOMNode {
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  if (isComponent(vNode.tagName)) {
    const component = vNode.tagName;
    if (!component.vDom) {
      throw new Error("Component haven't vDom");
    }
    return createDOMNode(component.vDom);
  }

  const node = document.createElement(vNode.tagName);
  patchProps(node, {}, vNode.props);
  vNode.children.forEach(child => {
    node.appendChild(createDOMNode(child));
  });
  return node;
}

/**
 * Вычисляет разницу двумя VDom элементам и применяет её к `node`
 * @param node DOM-элемент на странице
 * @param vNode VDOM для текущего состояния
 * @param nextVNode VDOM для нового состояния
 * @returns
 */
export function patchNode(node: DOMNode, vNode?: VNode, nextVNode?: VNode): DOMNode | null {
  if (nextVNode === undefined) {
    if (typeof vNode === 'object' && typeof vNode.tagName === 'object') {
      vNode.tagName.dispatchComponentDidUnMount();
    }
    node.remove();
    return null;
  }

  if (
    typeof vNode === 'string' ||
    typeof vNode === 'number' ||
    typeof nextVNode === 'string' ||
    typeof nextVNode === 'number'
  ) {
    if (vNode !== nextVNode) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }
    return node;
  }

  if (vNode?.tagName !== nextVNode.tagName) {
    if (isComponent(vNode?.tagName) && isComponent(nextVNode.tagName)) {
      const curComponent = vNode?.tagName;
      const newComponent = nextVNode.tagName;

      if (Object.getPrototypeOf(curComponent) === Object.getPrototypeOf(newComponent)) {
        return patchNode(node, curComponent?.vDom, newComponent.vDom);
      }

      curComponent?.dispatchComponentDidUnMount();
      if (!newComponent.vDom) {
        throw new Error("Component haven't vDom");
      }
      const newDomNode = createDOMNode(newComponent.vDom);
      node.replaceWith(newDomNode);
      newComponent.dispatchComponentDidMount(newDomNode);
      return newDomNode;
    }

    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }

  patchProps(node, vNode.props, nextVNode.props);
  patchChildren(node, vNode.children, nextVNode.children);
  return node;
}

function listener(this: Record<string, (e: Event) => EventListener>, event: Event): EventListener {
  return this[event.type](event);
}

/**
 * Обновляет значение аттрибута у DOM элемента
 * @param node DOM элемент
 * @param key название аттрибута
 * @param value текущее значение аттрибута
 * @param nextValue новое значение аттрибута
 */
function patchProp(node: Element, key: string, value: unknown, nextValue: unknown): void {
  if (key.startsWith('$')) {
    const eventName = key.slice(1);
    // @ts-expect-error сложно вывести тип исключающий readonly поля, да и при записи в readonly ничего не произойдет
    node[eventName] = nextValue;
    if (!nextValue) {
      node.removeEventListener(eventName, listener);
    } else if (!value) {
      node.addEventListener(eventName, listener);
    }
    return;
  }
  if (key === 'className') {
    key = 'class';
  }
  if (nextValue == null || nextValue === false) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, String(nextValue));
  }
}

/**
 * Вычисляет разницу в между наборами аттрибутов и применяет её к DOM элементу
 * @param node DOM элемент
 * @param props текущий набор аттрибутов
 * @param nextProps новый набор аттрибутов
 */
function patchProps(node: DOMNode, props: Props, nextProps: Props): void {
  const mergedProps = { ...props, ...nextProps };
  Object.keys(mergedProps).forEach(key => {
    if (props[key] !== nextProps[key]) {
      patchProp(node as Element, key, props[key], nextProps[key]);
    }
  });
}

/**
 * Обновляет дочерние элементы DOM узла на основе разницы в их VDOM представлении
 * @param parent DOM элемент
 * @param vChildren текущее VDOM представление дочерних элементов
 * @param nextVChildren новое VDOM представление дочерних элементов
 */
function patchChildren(parent: DOMNode, vChildren: VNode[], nextVChildren: VNode[]): void {
  //`Array.from`, т.к. у NodeList мутабельный размер и при удалении элемента forEach выполнится `length-1` раз и не обработает последний элемент
  Array.from(parent.childNodes).forEach((childNode, i) => {
    patchNode(childNode, vChildren[i], nextVChildren[i]);
  });
  nextVChildren.slice(vChildren.length).forEach(vChild => {
    parent.appendChild(createDOMNode(vChild));
  });
}

/** Монтирует компонент в DOM дерево */
export function mount(componentConstructor: new () => Component, container: HTMLElement) {
  const component = new componentConstructor();
  if (!component.vDom) {
    throw new Error("Component haven't vDom");
  }

  const domNode = createDOMNode(component.vDom);
  container.appendChild(domNode);
  component.dispatchComponentDidMount(domNode);
}
