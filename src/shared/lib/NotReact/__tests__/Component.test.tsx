import { expect } from 'chai';
import { TestComponent } from './TestComponent.tsx';
import { sleep } from '../../utils/common.ts';
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

  // describe.todo('Ререндер при изменениях');
});
