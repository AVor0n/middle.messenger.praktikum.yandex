/* eslint-disable max-classes-per-file */

import { Component } from '../Component';
import { type Props } from '../types';
import { mount } from '../vDom';

interface FieldProps extends Props {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}


describe('Методы жизненного цикла', () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });
  const initFn = vitest.fn();
  const mountFn = vitest.fn();
  const unmountFn = vitest.fn();
  const willUpdateFn = vitest.fn();
  const didUpdateFn = vitest.fn();

  class Test extends Component {
    constructor() {
      super({}, {});
    }

    protected init(): void {
      initFn();
    }

    protected componentDidMount(_node: ChildNode): void {
      mountFn();
    }

    protected componentWillUpdate(_oldProps: FieldProps, _newProps: FieldProps): void {
      willUpdateFn();
    }

    protected componentDidUpdate(_oldProps: FieldProps, _newProps: FieldProps): void {
      didUpdateFn();
    }

    protected componentDidUnmount(): void {
      unmountFn();
    }

    public render() {
      return <div>test</div>;
    }
  }

  class App extends Component {
    constructor() {
      super({}, {});
    }

    public render() {
      return <Test />;
    }
  }

  test('mount', async () => {
    await mount(<App />, document.body);
    expect(document.body.firstChild).toMatchInlineSnapshot(`
      <div>
        test
      </div>
    `);
    expect(initFn).toBeCalledTimes(1);
    expect(mountFn).toBeCalledTimes(1);
  });
});

describe.todo('Ререндер при изменениях');
