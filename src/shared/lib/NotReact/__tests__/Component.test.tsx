/* eslint-disable max-classes-per-file */
import { Component, mount } from '..';
import type { Props } from '..';

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
  class App extends Component {
    constructor() {
      super({}, {});
    }

    public render() {
      return <Test />;
    }
  }
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
