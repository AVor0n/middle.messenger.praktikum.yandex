/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createDOMNode, patchNode } from '..';
import { Component } from '../Component';
import type { PropsWithChildren } from '../types';

describe('Создание VDom', () => {
  test('простой тег', () => {
    expect(<div />).toStrictEqual({
      tagName: 'div',
      props: null,
      children: [],
    });
  });

  test('тег с обработчиком', () => {
    const onClick = vitest.fn();
    expect(<button id="btn" $click={onClick} />).toStrictEqual({
      tagName: 'button',
      props: { id: 'btn', $click: onClick },
      children: [],
    });
  });

  test('компонент c вложенными элементами', () => {
    class Button extends Component<PropsWithChildren<{ id: string; onClick?: () => void }>> {
      constructor(props: PropsWithChildren<{ id: string; onClick?: () => void }>) {
        super({}, props);
      }

      public render() {
        return <button id={this.props.id}>{this.props.children}</button>;
      }
    }
    const onClick = vitest.fn();
    expect(
      <div>
        <Button id="btn" onClick={onClick}>
          Hello
          <h2>Click me!</h2>
        </Button>
        <Button id="secondBtn" />
      </div>,
    ).toStrictEqual({
      tagName: 'div',
      props: null,
      children: [
        {
          tagName: expect.any(Button),
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
          tagName: expect.any(Button),
          props: { id: 'secondBtn' },
          children: [],
        },
      ],
    });
  });
});

describe('Создание DOM из vDOM', () => {
  test('string', () => {
    expect(createDOMNode('test')).toMatchInlineSnapshot('test');
  });

  test('number', () => {
    expect(createDOMNode(42)).toMatchInlineSnapshot('42');
  });

  test('HTMLElement', () => {
    expect(
      createDOMNode({
        tagName: 'div',
        props: null,
        children: [],
      }),
    ).toMatchInlineSnapshot('<div />');
  });

  test('component', () => {
    class Test extends Component {
      public render(): JSX.Element {
        return <div>test</div>;
      }
    }

    expect(
      createDOMNode({
        tagName: new Test({}, {}),
        props: null,
        children: ['test'],
      }),
    ).toMatchInlineSnapshot(`
      <div>
        test
      </div>
    `);
  });

  test('HTMLElement с пропсами', () => {
    expect(
      createDOMNode({
        tagName: 'div',
        props: { className: 'testClass', id: 'testId' },
        children: [],
      }),
    ).toMatchInlineSnapshot(`
      <div
        class="testClass"
        id="testId"
      />
    `);
  });

  test('HTMLElement с обработчиком', () => {
    const onClick = vitest.fn();
    const button = createDOMNode({
      tagName: 'button',
      props: { $click: onClick },
      children: [],
    }) as HTMLButtonElement;

    expect(button).toMatchInlineSnapshot('<button />');

    expect(onClick).toBeCalledTimes(0);
    button.click();
    expect(onClick).toBeCalledTimes(1);
  });
});

describe('Обновление DOM', () => {
  test('Создание элементов', () => {
    const container = document.createElement('div');
    const vNode1 = {
      tagName: 'div',
      props: { id: 'testId' },
      children: ['test'],
    };
    const vNode2 = {
      tagName: 'div',
      props: { id: 'testId' },
      children: [
        'test',
        {
          tagName: 'button',
          props: { id: 'btn', $click: vitest.fn() },
          children: [],
        },
      ],
    };
    const node = createDOMNode(<div id="testId">test</div>);
    container.append(node);
    patchNode(node, vNode1, vNode2);
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <div
        id="testId"
      >
        test
        <button
          id="btn"
        />
      </div>
    `);
  });
  test('Удаление элементов', () => {
    const container = document.createElement('div');
    const vNode1 = {
      tagName: 'div',
      props: { id: 'testId' },
      children: [
        'test',
        {
          tagName: 'button',
          props: { id: 'btn' },
          children: ['13'],
        },
        42,
        42,
      ],
    };
    const vNode2 = {
      tagName: 'div',
      props: { id: 'testId' },
      children: ['test', 42],
    };
    const node = createDOMNode(
      <div id="testId">
        test
        <button id="btn">13</button>
        42 42
      </div>,
    );
    container.append(node);
    patchNode(node, vNode1, vNode2);
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <div
        id="testId"
      >
        test
        42
      </div>
    `);
  });
  test('Обновление пропсов', () => {
    const container = document.createElement('div');
    const vNode1 = {
      tagName: 'div',
      props: { id: 'testId', className: 'test2', hidden: true },
      children: [],
    };
    const vNode2 = {
      tagName: 'div',
      props: { className: 'test test2 test3', title: 'div', hidden: false },
      children: [],
    };
    const node = createDOMNode(<div id="testId" className="test2" hidden />);
    container.append(node);
    patchNode(node, vNode1, vNode2);
    expect(container.firstElementChild).toMatchInlineSnapshot(`
      <div
        class="test test2 test3"
        title="div"
      />
    `);
  });
  test('Изменение обработчиков', () => {
    const container = document.createElement('div');
    const onClick1 = vitest.fn();
    const onClick2 = vitest.fn();
    const onDblClick = vitest.fn();
    const onFocus = vitest.fn();
    const onBlur = vitest.fn();

    const events = [
      new MouseEvent('click'),
      new MouseEvent('dblclick'),
      new MouseEvent('focus'),
      new MouseEvent('blur'),
    ];

    const node = createDOMNode(<div $click={onClick1} $dblclick={onDblClick} $focus={onFocus} />) as HTMLDivElement;
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
    expect(onClick1).toBeCalledTimes(1);
    expect(onClick2).toBeCalledTimes(0);
    expect(onDblClick).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).toBeCalledTimes(0);
    vitest.clearAllMocks();

    patchNode(node, vNode1, vNode2);
    expect(container.firstElementChild).toMatchInlineSnapshot('<div />');
    events.forEach(event => node.dispatchEvent(event));
    expect(onClick1).toBeCalledTimes(0);
    expect(onClick2).toBeCalledTimes(1);
    expect(onDblClick).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(0);
    expect(onBlur).toBeCalledTimes(1);
  });
});
