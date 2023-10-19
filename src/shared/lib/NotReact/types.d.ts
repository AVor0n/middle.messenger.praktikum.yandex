/* eslint-disable @typescript-eslint/no-unused-vars */
type Props = Record<string, unknown>;

type VElement = JSX.Element;
type VNode = VElement | string | number;
type VComponent<P extends object = Props> = (props: P) => VElement;

/** для оптимизации, реальная DOM нода может хранить ссылку на виртуальную ноду, на основе которой она была создана */
interface NodeWithVNode extends ChildNode {
  v?: VNode; // TODO: записывать в Symbol
}

type JSXIntrinsicElements = {
  [tag in keyof HTMLElementTagNameMap]: Omit<Partial<HTMLElementTagNameMap[tag]>, 'children'> & {
    children?: VElement[];
    key?: string;
  };
};

declare const createVNode = () => Element;
namespace JSX {
  interface IntrinsicElements extends JSXIntrinsicElements {}

  interface Element {
    tagName: string;
    props: Props;
    children: VNode[];
  }
}
