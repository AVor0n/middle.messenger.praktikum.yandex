/* eslint-disable import/extensions */
import { Component } from '../Component.ts';
import { type State, type Props } from '../types.ts';
import { createVNode } from '../vDom.ts';

interface TestComponentState extends State {
  content: string;
}

interface TestComponentProps extends Props {
  onInit?: () => void;
  onMount?: () => void;
  onUnmount?: () => void;
  onWillUpdate?: () => void;
  onDidUpdate?: () => void;
  onRender?: () => void;
}

export class TestComponent extends Component<TestComponentProps, TestComponentState> {
  constructor(props: TestComponentProps) {
    super({ content: 'test' }, props);
  }

  protected init(): void {
    this.props.onInit?.();
  }

  protected componentDidMount(_node: ChildNode): void {
    this.props.onMount?.();
  }

  protected componentWillUpdate(_oldProps: TestComponentProps, _newProps: TestComponentProps): void {
    this.props.onWillUpdate?.();
  }

  protected componentDidUpdate(_oldProps: TestComponentProps, _newProps: TestComponentProps): void {
    this.props.onDidUpdate?.();
  }

  protected componentDidUnmount(): void {
    this.props.onUnmount?.();
  }

  public render() {
    this.props.onRender?.();
    return <div>{this.state.content}</div>;
  }
}
