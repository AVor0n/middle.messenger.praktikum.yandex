export type Props = Record<string, unknown>;
export type Tag = keyof HTMLElementTagNameMap;

export interface IComponent<P extends Props> {
  init(): void;
  componentDidMount(oldProps: P): void;
  dispatchComponentDidMount(): void;
  componentDidUpdate(oldProps: P, newProps: P): boolean;
  render(props: P): void;
  show(): void;
  hide(): void;
}
