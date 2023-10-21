import { patchNode } from './vDom';
import { EventBus } from '../EventBus';
import type { DOMNode, Props, State, VElement } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor<T extends unknown[] = any> = new (...args: T) => Component;

export abstract class Component<P extends Props = Props, S extends State = State> {
  private eventBus: EventBus<{
    //создание state, props
    init: () => void;
    // вычисление vdom
    'flow:render': (oldProps: P, newProps: P) => void;
    //завершение монтирования vdom в dom
    'flow:component-did-mount': (node: DOMNode) => void;
    // получение новых пропсов
    'flow:component-update': (oldProps: P, newProps: P) => void;
    //завершение обновления dom
    'flow:component-did-update': (oldProps: P, newProps: P) => void;
    //завершение удаления компонента из dom
    'flow:component-did-unmount': () => void;
  }>;

  private _ref: DOMNode | null = null;

  private _vDom: VElement | undefined;

  /** Ссылка на DOM-узел, который представляет компонент */
  public get ref() {
    return this._ref;
  }

  /** VDOM-представление компонента */
  public get vDom() {
    return this._vDom;
  }

  /** Внутреннее состояние компонента, при изменении происходит автоматический ререндер */
  protected state: S;

  /** Данные получаемые из родительского компонента */
  protected readonly props: P;

  constructor(state: S, props: P) {
    this.eventBus = new EventBus();
    this.registerEvents();

    this.state = this.makeStateProxy(state);
    this.props = props;

    this.eventBus.emit('init');
  }

  private registerEvents() {
    this.eventBus.on('init', this._init.bind(this));
    this.eventBus.on('flow:render', this._render.bind(this));
    this.eventBus.on('flow:component-did-mount', this._componentDidMount.bind(this));
    this.eventBus.on('flow:component-update', this._componentUpdate.bind(this));
    this.eventBus.on('flow:component-did-update', this._componentDidUpdate.bind(this));
    this.eventBus.on('flow:component-did-unmount', this._componentDidUnmount.bind(this));
  }

  private makeStateProxy(state: S) {
    return new Proxy(state, {
      get: (target, prop) => {
        const value = target[String(prop)];
        return (typeof value === 'function' ? value.bind(target) : value) as typeof target.prop;
      },
      set: (target, prop, value) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target[prop as keyof S] = value;

        this.eventBus.emit('flow:render', this.props, this.props);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _init() {
    setTimeout(() => this.init());
    this.eventBus.emit('flow:render', {} as P, this.props);
  }

  private _render(oldProps: P, newProps: P) {
    const oldVDom = this._vDom;
    this._vDom = this.render(this.props);
    if (this._ref) {
      this._ref = patchNode(this._ref, oldVDom, this._vDom);
    }
    this.eventBus.emit('flow:component-did-update', oldProps, newProps);
  }

  private _componentDidMount(node: DOMNode) {
    this._ref = node;
    this.componentDidMount(node);
  }

  private _componentDidUnmount() {
    this.componentDidUnmount();
  }

  private _componentUpdate(oldProps: P, newProps: P) {
    this.componentUpdate(oldProps, newProps);
    if (this.shouldComponentUpdate(oldProps, newProps)) {
      this.eventBus.emit('flow:render', oldProps, newProps);
    }
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    this.componentDidUpdate(oldProps, newProps);
  }

  /** Срабатывает после инициализации компонента */
  protected init() {}

  /** Срабатывает после монтирования компонента в DOM дерево */
  protected componentDidMount(_node: DOMNode) {}

  /** Срабатывает при получении новых пропсов */
  protected componentUpdate(_oldProps: P, _newProps: P) {}

  /** Срабатывает при изменении пропсов, позволяет отменить ререндер  */
  protected shouldComponentUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  /** Срабатывает после ререндера компонента */
  protected componentDidUpdate(_oldProps: P, _newProps: P) {}

  /** Срабатывает при удалении компонента из DOM дерева */
  protected componentDidUnmount() {}

  public abstract render(props: P): JSX.Element;

  public dispatchComponentDidMount(node: DOMNode) {
    this.eventBus.emit('flow:component-did-mount', node);
  }

  public dispatchComponentUpdate(oldProps: P, newProps: P) {
    this.eventBus.emit('flow:component-update', oldProps, newProps);
  }

  public dispatchComponentDidUnMount() {
    this.eventBus.emit('flow:component-did-unmount');
  }
}
