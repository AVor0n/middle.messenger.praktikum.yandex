export function createVNode(tagName: string | VComponent, props: Props = {}, ...children: VNode[]): VElement {
  if (typeof tagName === 'function') {
    return tagName(props);
  }

  return {
    tagName,
    props,
    children: children.flat(),
  };
}

export function createDOMNode(vNode: VNode): NodeWithVNode {
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }
  const node = document.createElement(vNode.tagName);
  patchProps(node, {}, vNode.props);
  vNode.children.forEach(child => {
    node.appendChild(createDOMNode(child));
  });
  return node;
}

export function patchNode(node: NodeWithVNode, vNode?: VNode, nextVNode?: VNode): NodeWithVNode | null {
  if (nextVNode === undefined) {
    node.remove();
    return null;
  }
  if (vNode === undefined) {
    const nextNode = createDOMNode(nextVNode);
    node.replaceWith(nextNode);
    return nextNode;
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
  if (vNode.tagName !== nextVNode.tagName) {
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

function patchProp(node: Element, key: string, value: unknown, nextValue: unknown): void {
  if (key.startsWith('on')) {
    const eventName = key.slice(2);
    if (eventName in node) {
      // @ts-expect-error сложно вывести тип исключающий readonly поля, да и при записи в readonly ничего не произойдет
      node[eventName] = nextValue;
      if (!nextValue) {
        node.removeEventListener(eventName, listener);
      } else if (!value) {
        node.addEventListener(eventName, listener);
      }
      return;
    }
  }
  if (nextValue == null || nextValue === false) {
    node.removeAttribute(key);
    return;
  }
  node.setAttribute(key, String(nextValue));
}

function patchProps(node: NodeWithVNode, props: Props, nextProps: Props): void {
  const mergedProps = { ...props, ...nextProps };
  Object.keys(mergedProps).forEach(key => {
    if (props[key] !== nextProps[key]) {
      patchProp(node as Element, key, props[key], nextProps[key]);
    }
  });
}

function patchChildren(parent: NodeWithVNode, vChildren: VNode[], nextVChildren: VNode[]): void {
  parent.childNodes.forEach((childNode, i) => {
    patchNode(childNode, vChildren[i], nextVChildren[i]);
  });
  nextVChildren.slice(vChildren.length).forEach(vChild => {
    parent.appendChild(createDOMNode(vChild));
  });
}

export function render(nextVNode: VElement, node: NodeWithVNode): NodeWithVNode | null {
  const patchedNode = patchNode(node, node.v, nextVNode);
  if (patchedNode) {
    patchedNode.v = nextVNode;
  }
  return patchedNode;
}
