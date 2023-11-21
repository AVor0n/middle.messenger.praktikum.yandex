import { expect } from 'chai';
import Sinon from 'sinon';
import { Component } from '../Component.ts';
import { createDOMNode, patchNode, createVNode, mount } from '../vDom.ts';
import type { PropsWithChildren } from '../types.ts';

describe('Создание VDom', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('простой тег', () => {
    expect(<div />).to.deep.equal({
      tagName: 'div',
      props: null,
      children: [],
    });
  });

  it('тег с обработчиком', () => {
    const onClick = Sinon.stub();
    expect(<button id="btn" $click={onClick} />).to.deep.equal({
      tagName: 'button',
      props: { id: 'btn', $click: onClick },
      children: [],
    });
  });

  it('компонент c вложенными элементами', () => {
    class Button extends Component<PropsWithChildren<{ id: string; onClick?: () => void }>> {
      constructor(props: PropsWithChildren<{ id: string; onClick?: () => void }>) {
        super({}, props);
      }

      public render() {
        return <button id={this.props.id}>{this.props.children}</button>;
      }
    }
    const onClick = Sinon.stub();
    expect(
      <div>
        <Button id="btn" onClick={onClick}>
          Hello
          <h2>Click me!</h2>
        </Button>
        <Button id="secondBtn" />
      </div>,
    ).to.deep.equal({
      tagName: 'div',
      props: null,
      children: [
        {
          tagName: Button,
          props: { id: 'btn', onClick },
          children: [
            'Hello',
            {
              tagName: 'h2',
              props: null,
              children: ['Click me!'],
            },
          ],
        },
        {
          tagName: Button,
          props: { id: 'secondBtn' },
          children: [],
        },
      ],
    });
  });
});

describe('Создание DOM из vDOM', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('string', async () => {
    await mount('test', document.body);
    expect(document.body.innerHTML).to.equal('test');
  });

  it('number', async () => {
    await mount(42, document.body);
    expect(document.body.innerHTML).to.equal('42');
  });

  it('HTMLElement без пропсов', async () => {
    await mount(<div />, document.body);
    expect(document.body.innerHTML).to.equal('<div></div>');
  });

  it('HTMLElement со строковыми пропсами', async () => {
    await mount(<div className="testClass" id="testId" />, document.body);
    expect(document.body.innerHTML).to.equal('<div class="testClass" id="testId"></div>');
  });

  it('HTMLElement с обработчиком. Рендер', async () => {
    const onClick = Sinon.stub();
    await mount(<button $click={onClick} />, document.body);
    expect(document.body.innerHTML).to.deep.equal('<button></button>');
  });

  it('HTMLElement с обработчиком. Проверка работы обработчика', async () => {
    const onClick = Sinon.stub();
    await mount(<button $click={onClick} />, document.body);
    const button = document.querySelector('button');
    expect(button).not.to.be.equal(undefined);

    button?.click();
    expect(onClick.callCount).to.be.equal(1);
    button?.click();
    expect(onClick.callCount).to.be.equal(2);
  });

  it('Component', async () => {
    class Test extends Component {
      constructor() {
        super({}, {});
      }

      public render() {
        return <div>test</div>;
      }
    }

    await mount(<Test>test</Test>, document.body);
    expect(document.body.innerHTML).to.equal('<div>test</div>');
  });
});

describe.skip('Обновление DOM', () => {
  it('Создание элементов', async () => {
    const vNode1 = <div id="testId">test</div>;
    const vNode2 = (
      <div id="testId">
        test
        <button id="btn" $click={Sinon.stub()} />
      </div>
    );

    await mount(vNode1, document.body);
    await patchNode(document.body.firstElementChild!, vNode1, vNode2);
    expect(document.body.innerHTML).to.equal('<div id="testId">test<button id="btn"></button></div>');
  });

  it('Удаление элементов', async () => {
    const vNode1 = (
      <div id="testId">
        test
        <button id="btn">13</button>
        42 42
      </div>
    );
    const vNode2 = <div id="testId">test 42</div>;

    await mount(vNode1, document.body);
    await patchNode(document.body.firstElementChild!, vNode1, vNode2);
    expect(document.body.innerHTML).to.equal('<div id="testId">test 42</div>');
  });

  it('Обновление пропсов', async () => {
    const vNode1 = <div id="testId" className="test2" hidden />;
    const vNode2 = <div className="test test2 test3" title="div" hidden={false} />;

    await mount(vNode1, document.body);
    await patchNode(document.body.firstElementChild!, vNode1, vNode2);
    expect(document.body.innerHTML).to.equal('<div class="test test2 test3" title="div"></div>');
  });

  it('Изменение обработчиков', async () => {
    const container = document.createElement('div');
    const onClick1 = Sinon.stub();
    const onClick2 = Sinon.stub();
    const onDblClick = Sinon.stub();
    const onFocus = Sinon.stub();
    const onBlur = Sinon.stub();
    const events = [
      new MouseEvent('click'),
      new MouseEvent('dblclick'),
      new MouseEvent('focus'),
      new MouseEvent('blur'),
    ];
    const node = (await createDOMNode(
      <div $click={onClick1} $dblclick={onDblClick} $focus={onFocus} />,
    )) as HTMLDivElement;
    container.append(node);
    const vNode1 = {
      tagName: 'div',
      props: { $click: onClick1, $dblclick: onDblClick, $focus: onFocus },
      children: [],
    };
    const vNode2 = {
      tagName: 'div',
      props: { $click: onClick2, $dblclick: onDblClick, $blur: onBlur },
      children: [],
    };
    events.forEach(event => node.dispatchEvent(event));
    expect(onClick1.callCount).to.be.equal(1);
    expect(onClick2.callCount).to.be.equal(0);
    expect(onDblClick.callCount).to.be.equal(1);
    expect(onFocus.callCount).to.be.equal(1);
    expect(onBlur.callCount).to.be.equal(0);
    Sinon.reset();
    await patchNode(node, vNode1, vNode2);
    expect(container.firstElementChild).to.deep.equal('<div />');
    events.forEach(event => node.dispatchEvent(event));
    expect(onClick1.callCount).to.be.equal(0);
    expect(onClick2.callCount).to.be.equal(1);
    expect(onDblClick.callCount).to.be.equal(1);
    expect(onFocus.callCount).to.be.equal(0);
    expect(onBlur.callCount).to.be.equal(1);
  });
});
