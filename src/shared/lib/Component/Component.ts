import { EventBus } from '../EventBus';
import type { IComponent, Props, Tag } from './types';

export abstract class Component<T extends Tag = 'div', P extends Props = Props> implements IComponent<P> {
  private eventBus: EventBus<{
    init: () => void;
    'flow:component-did-mount': () => void;
    'flow:component-did-update': (oldProps: P, newProps: P) => void;
    'flow:render': () => void;
  }>;

  private element!: HTMLElementTagNameMap[T];

  private meta: {
    tagName: T;
    props: P;
  };

  public props: P;

  constructor(tagName: T, props: P) {
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);
    this.eventBus = new EventBus();

    this.registerEvents();
    this.eventBus.emit('init');
  }

  private registerEvents() {
    this.eventBus.on('init', this.init.bind(this));
    this.eventBus.on('flow:component-did-mount', this._componentDidMount.bind(this));
    this.eventBus.on('flow:component-did-update', this._componentDidUpdate.bind(this));
    this.eventBus.on('flow:render', this._render.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    this.element = document.createElement(tagName);
  }

  public init() {
    this.createResources();
    this.eventBus.emit('flow:render');
  }

  private _componentDidMount() {
    this.componentDidMount(this.props);
  }

  public componentDidMount(_oldProps: P): void {}

  public dispatchComponentDidMount() {
    this.eventBus.emit('flow:component-did-mount');
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  public setProps = (nextProps?: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render() {
    const block = this.render(this.props);
    // TODO: Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    this.element.innerHTML = block;
  }

  public abstract render(_props: P): string;

  public getContent() {
    return this.element;
  }

  private makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof P];
        return (typeof value === 'function' ? value.bind(target) : value) as (typeof target)[keyof P];
      },
      set: (target, prop, value) => {
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value as P[keyof P];

        this.eventBus.emit('flow:component-did-update', { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }
}
