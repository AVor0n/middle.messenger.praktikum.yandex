import { patchNode } from './vDom';
import { EventBus } from '../EventBus';
import { generateId } from '../utils';
import type { DOMNode, Props, State, VElement } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor<T extends unknown[] = any> = new (...args: T) => Component;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Component<P extends Props = any, S extends State = any> {
  public id = generateId();

  private eventBus: EventBus<{
    //создание state, props
    init: () => void;
    // вычисление vdom
    'flow:render': (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;
    //завершение монтирования vdom в dom
    'flow:component-did-mount': (node: DOMNode) => void;
    // получение новых пропсов
    'flow:component-update': (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;
    //завершение обновления dom
    'flow:component-did-update': (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;
    //завершение удаления компонента из dom
    'flow:component-did-unmount': () => void;
  }>;

  private _ref: DOMNode | null = null;

  private _vDom: VElement | undefined;

  /** Ссылка на DOM-узел */
  public get ref() {
    return this._ref;
  }

  /** VDOM представление последнего рендера */
  public get vDom() {
    return this._vDom;
  }

  protected state: S;

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

        this.eventBus.emit('flow:render', { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _init() {
    setTimeout(() => this.init());
    this.eventBus.emit('flow:render', {}, this.props);
  }

  private _render(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    const oldVDom = this._vDom;
    this._vDom = this.render(this.props);
    if (this._ref) {
      this._ref = patchNode(this._ref, oldVDom, this._vDom);
    }
    this.eventBus.emit('flow:component-did-update', oldProps, newProps);
  }

  private _componentDidMount(node: DOMNode) {
    this._ref = node;
    this.componentDidMount?.(node);
  }

  private _componentDidUnmount() {
    this.componentDidUnmount?.();
  }

  private _componentUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    this.componentUpdate?.(oldProps, newProps);
    if (this.shouldComponentUpdate(oldProps, newProps)) {
      this.eventBus.emit('flow:render', oldProps, newProps);
    }
  }

  private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    this.componentDidUpdate?.(oldProps, newProps);
  }

  /** Срабатывает после инициализации компонента */
  protected init() {}

  /** Срабатывает после монтирования компонента в DOM дерево */
  protected componentDidMount?: (node: DOMNode) => void;

  /** Срабатывает при получении новых пропсов */
  protected componentUpdate?: (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;

  /** Срабатывает при изменении пропсов, позволяет отменить ререндер  */
  protected shouldComponentUpdate(_oldProps: Record<string, unknown>, _newProps: Record<string, unknown>) {
    return true;
  }

  /** Срабатывает после ререндера компонента */
  protected componentDidUpdate?: (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;

  /** Срабатывает при удалении компонента из DOM дерева */
  protected componentDidUnmount?: () => void;

  public abstract render(props: P): JSX.Element;

  public dispatchComponentDidMount(node: DOMNode) {
    this.eventBus.emit('flow:component-did-mount', node);
  }

  public dispatchComponentUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    this.eventBus.emit('flow:component-update', oldProps, newProps);
  }

  public dispatchComponentDidUnMount() {
    this.eventBus.emit('flow:component-did-unmount');
  }
}
