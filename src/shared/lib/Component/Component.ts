import { EventBus } from '../EventBus';
import { generateId } from '../utils';
import type { TemplateContext, Props } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Component<P extends Props = any> {
  public id = generateId();

  private eventBus: EventBus<{
    init: () => void;
    'flow:component-did-mount': () => void;
    'flow:component-did-update': (oldProps: Record<string, unknown>, newProps: Record<string, unknown>) => void;
    'flow:render': () => void;
  }>;

  private _element: HTMLElement | undefined;

  protected props: Record<string, unknown>;

  public children: Record<string, Component> = {};

  protected refs: Record<string, Component> = {};

  constructor(propsWithChildren: P) {
    this.eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this.makePropsProxy(props);

    this.registerEvents();
    this.eventBus.emit('init');
  }

  private _getChildrenAndProps(childrenAndProps: Record<string, unknown>) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Component> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  private _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };
    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName]);
    });
  }

  private registerEvents() {
    this.eventBus.on('init', this._init.bind(this));
    this.eventBus.on('flow:component-did-mount', this._componentDidMount.bind(this));
    this.eventBus.on('flow:component-did-update', this._componentDidUpdate.bind(this));
    this.eventBus.on('flow:render', this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus.emit('flow:render');
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount() {
    this.eventBus.emit('flow:component-did-mount');
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit('flow:render');
    }
  }

  protected componentDidUpdate(_oldProps: Record<string, unknown>, _newProps: Record<string, unknown>) {
    return true;
  }

  protected setProps = (nextProps?: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected abstract render(): DocumentFragment;

  protected compile(template: HandlebarsTemplateDelegate<unknown>, context: Partial<TemplateContext>) {
    const contextAndStubs = { ...context, __refs: this.refs };
    const html = template(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  public get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  private makePropsProxy(props: Record<string, unknown>) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[String(prop)];
        return (typeof value === 'function' ? value.bind(target) : value) as typeof target.prop;
      },
      set: (target, prop, value) => {
        target[String(prop)] = value;

        this.eventBus.emit('flow:component-did-update', { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}
