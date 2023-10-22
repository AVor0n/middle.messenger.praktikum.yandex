export type Props = Record<string, unknown>;
export type PropsWithChildren<T extends Props> = T & {
  children?: VElement[] | VElement;
};
export type State = Record<string, unknown>;

export type VElement = JSX.Element;
export type VNode = VElement | string | number;
export type DOMNode = ChildNode;
