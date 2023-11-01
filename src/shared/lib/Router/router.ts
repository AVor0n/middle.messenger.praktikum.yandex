class Router {
  private routes: Record<string, (() => void) | undefined> = {};

  private notFoundCallback?: () => void;

  constructor() {
    this.listen();
  }

  private listen() {
    window.addEventListener('popstate', this.resolve.bind(this));
  }

  public addRoute(path: string, cb: () => void) {
    this.routes[path] = cb;
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
    const targetRoute = this.routes[path];
    if (targetRoute) {
      targetRoute();
    } else {
      this.notFoundCallback?.();
    }
  }
}

export const router = new Router();
