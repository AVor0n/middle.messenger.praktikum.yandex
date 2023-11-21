/* eslint-disable import/extensions */
import { Component } from '../Component.ts';
import { type Props } from '../types.ts';
import { createVNode } from '../vDom.ts';

interface FieldProps extends Props {
  onInit?: () => void;
  onMount?: () => void;
  onUnmount?: () => void;
  onWillUpdate?: () => void;
  onDidUpdate?: () => void;
  onRender?: () => void;
}

export class TestComponent extends Component<FieldProps> {
  constructor(props: FieldProps) {
    super({}, props);
  }

  protected init(): void {
    this.props.onInit?.();
  }

  protected componentDidMount(_node: ChildNode): void {
    this.props.onMount?.();
  }

  protected componentWillUpdate(_oldProps: FieldProps, _newProps: FieldProps): void {
    this.props.onWillUpdate?.();
  }

  protected componentDidUpdate(_oldProps: FieldProps, _newProps: FieldProps): void {
    this.props.onDidUpdate?.();
  }

  protected componentDidUnmount(): void {
    this.props.onUnmount?.();
  }

  public render() {
    this.props.onRender?.();
    return <div>test</div>;
  }
}
