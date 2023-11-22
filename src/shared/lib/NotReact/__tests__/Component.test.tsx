import { expect } from 'chai';
import { TestComponent } from './TestComponent.tsx';
import { sleep } from '../../utils/common.ts';
import { Component } from '../Component.ts';
import { type DOMNode, type Props } from '../types.ts';
import { mount, createVNode, patchNode } from '../vDom.ts';

describe('Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('Методы жизненного цикла вызываются в нужном порядке', async () => {
    let log: string[] = [];

    const initFn = () => log.push('init');
    const mountFn = () => log.push('mount');
    const unmountFn = () => log.push('unmount');
    const willUpdateFn = () => log.push('willUpdate');
    const didUpdateFn = () => log.push('didUpdate');
    const renderFn = () => log.push('render');

    const vDom1 = (
      <TestComponent
        onInit={initFn}
        onMount={mountFn}
        onWillUpdate={willUpdateFn}
        onDidUpdate={didUpdateFn}
        onUnmount={unmountFn}
        onRender={renderFn}
      />
    );

    await mount(vDom1, document.body);
    expect(log).to.be.deep.equal(['init', 'render', 'didUpdate', 'mount']);

    log = [];
    await patchNode(document.body.firstElementChild!, vDom1, vDom1);
    await sleep(0); // didUpdate вызывается после patch
    expect(log).to.be.deep.equal(['willUpdate', 'render', 'didUpdate']);

    log = [];
    await patchNode(document.body.firstElementChild!, vDom1);
    await sleep(0); // убедиться что didUpdate при unMount нет
    expect(log).to.be.deep.equal(['unmount']);
  });

  it('При изменении state происходит ререндер', async () => {
    const updateDelay = 10;
    class ComponentWithState extends Component<Props, { content: string }> {
      constructor() {
        super({ content: 'init content' }, {});
      }

      protected componentDidMount(_node: DOMNode): void {
        setTimeout(() => {
          this.state.content = 'new content';
        }, updateDelay);
      }

      render() {
        return <div>{this.state.content}</div>;
      }
    }

    await mount(<ComponentWithState />, document.body);
    expect(document.body.innerHTML).to.be.equal('<div>init content</div>');

    await sleep(updateDelay);
    expect(document.body.innerHTML).to.be.equal('<div>new content</div>');
  });

  it('shouldComponentUpdate позволяет игнорировать ререндер', async () => {
    class MemoComponent extends Component<{ content: string }> {
      constructor(props: { content: string }) {
        super({}, props);
      }

      protected shouldComponentUpdate(_oldProps: { content: string }, newProps: { content: string }): boolean {
        return newProps.content === 'good content';
      }

      render() {
        return <div>{this.props.content}</div>;
      }
    }

    const initRender = <MemoComponent content="init content" />;
    const notWillRender = <MemoComponent content="bad content" />;
    const willRerender = <MemoComponent content="good content" />;

    await mount(initRender, document.body);
    expect(document.body.innerHTML).to.be.equal('<div>init content</div>');

    await patchNode(document.body.firstElementChild!, initRender, notWillRender);
    expect(document.body.innerHTML).to.be.equal('<div>init content</div>');

    await patchNode(document.body.firstElementChild!, notWillRender, willRerender);
    expect(document.body.innerHTML).to.be.equal('<div>good content</div>');
  });
});
