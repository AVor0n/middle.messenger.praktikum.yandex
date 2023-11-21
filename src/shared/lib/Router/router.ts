class Router {
  private _routes = new Map<string, (() => void) | undefined>();

  private notFoundCallback?: () => void;

  public get routes() {
    return Object.fromEntries(this._routes);
  }

  constructor() {
    this.listen();
  }

  private listen() {
    window.addEventListener('popstate', this.resolve.bind(this));
  }

  public addRoute(path: string, cb: () => void) {
    this._routes.set(path, cb);
    return this;
  }

  public setNotFound(cb: () => void) {
    this.notFoundCallback = cb;
    return this;
  }

  public navigate(href: string) {
    window.history.pushState({}, '', href);
    this.resolve();
    return this;
  }

  public resolve() {
    const path = window.location.pathname;
    const targetRoute = this._routes.get(path);
    if (targetRoute) {
      targetRoute();
    } else {
      this.notFoundCallback?.();
    }
  }

  public flush = () => {
    this._routes.clear();
  };
}

export const router = new Router();
