import type { ComponentConstructor } from './Component';
import type { DOMNode, Props, State, VElement, VNode } from './types';

export function createVNode(
  tagName: string | ComponentConstructor,
  props: State = {},
  ...childElements: VNode[]
): VElement {
  try {
    return {
      tagName,
      props,
      children: childElements.flat().filter(Boolean),
    };
  } catch {
    throw new Error('Не удается построить vDOM');
  }
}

/**
 * Создает DOM элемент на основе его VDOM представления
 * @param vNode vDOM представление элемента
 */
export async function createDOMNode(vNode: VNode): Promise<DOMNode> {
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  if (typeof vNode.tagName === 'function') {
    // eslint-disable-next-line new-cap
    const component = new vNode.tagName({ ...vNode.props, children: vNode.children });
    await component.isReady;
    if (!component.vDom) {
      throw new Error('У компонента нет vDOM. Возможно не вызван render');
    }

    const dom = await createDOMNode(component.vDom);
    dom.v = component;
    dom.v.dispatchComponentDidMount(dom);
    return dom;
  }

  const node = document.createElement(vNode.tagName);
  patchProps(node, {}, vNode.props);
  await Promise.all(vNode.children.map(async child => createDOMNode(child))).then(children =>
    children.forEach(child => {
      node.appendChild(child);
    }),
  );
  return node;
}

/**
 * Вычисляет разницу двумя VDom элементам и применяет её к `node`
 * @param node DOM-элемент на странице
 * @param vNode VDOM для текущего состояния
 * @param nextVNode VDOM для нового состояния
 * @returns
 */
export async function patchNode(node: DOMNode, vNode?: VNode, nextVNode?: VNode): Promise<DOMNode | null> {
  if (nextVNode === undefined) {
    const comp = node.v;
    node.remove();
    comp?.dispatchComponentDidUnMount();
    return null;
  }

  if (
    typeof vNode === 'string' ||
    typeof vNode === 'number' ||
    typeof nextVNode === 'string' ||
    typeof nextVNode === 'number'
  ) {
    if (vNode !== nextVNode) {
      const nextNode = await createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }
    return node;
  }

  if (vNode?.tagName !== nextVNode.tagName) {
    if (typeof nextVNode.tagName === 'function') {
      const oldComp = node.v;
      const newNode = await createDOMNode(nextVNode);
      const newComp = newNode.v;
      node.replaceWith(newNode);
      oldComp?.dispatchComponentDidUnMount();
      newComp?.dispatchComponentDidMount(newNode);
      return null;
    }
    const nextNode = await createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
  }

  if (typeof vNode.tagName === 'function' && typeof nextVNode.tagName === 'function') {
    node.v?.dispatchComponentUpdate(
      { ...vNode.props, children: vNode.children },
      { ...nextVNode.props, children: nextVNode.children },
    );
    return node;
  }

  patchProps(node, vNode.props, nextVNode.props);
  await patchChildren(node, vNode.children, nextVNode.children);
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
async function patchChildren(parent: DOMNode, vChildren: VNode[], nextVChildren: VNode[]): Promise<void> {
  const children = Array.from(parent.childNodes);
  for (let i = 0; i < children.length; i += 1) {
    // При Promise.all возможны ошибки
    // eslint-disable-next-line no-await-in-loop
    await patchNode(children[i], vChildren[i], nextVChildren[i]);
  }
  await Promise.all(nextVChildren.slice(vChildren.length).map(async vChild => createDOMNode(vChild))).then(nodes =>
    nodes.forEach(node => {
      parent.appendChild(node);
    }),
  );
}

/** Монтирует компонент в DOM дерево */
export async function mount(vNode: VNode, container: HTMLElement) {
  const domNode = await createDOMNode(vNode);
  container.appendChild(domNode);
}
