import { expect } from 'chai';
import Sinon from 'sinon';
import { router } from './router.ts';

describe('Router', () => {
  beforeEach(() => {
    window.location.href = '/';
    router.flush();
  });

  describe('addRoute', () => {
    it('добавляет новые маршруты', () => {
      router.addRoute('/path1', Sinon.fake());
      router.addRoute('/path2', Sinon.fake());

      expect(router.routes).to.have.property('/path1');
      expect(router.routes).to.have.property('/path2');
    });
  });

  describe('flush', () => {
    it('очищает добавленные маршруты', () => {
      router.addRoute('/path1', Sinon.fake());
      router.addRoute('/path2', Sinon.fake());

      router.flush();

      expect(router.routes).to.have.not.any.keys;
    });
  });

  describe('navigate', () => {
    it('вызывает window.history.pushState', () => {
      const mockPushState = Sinon.stub(window.history, 'pushState');

      router.navigate('/new-path');

      expect(mockPushState.calledWith({}, '', '/new-path')).to.be.true;
      mockPushState.restore();
    });

    it('вызывает соответствующую функцию маршрута', () => {
      const page1RouteCb = Sinon.fake();
      const page2RouteCb = Sinon.fake();
      const page3RouteCb = Sinon.fake();

      router
        .addRoute('/page1', page1RouteCb)
        .addRoute('/page2', page2RouteCb)
        .addRoute('/page3', page3RouteCb)
        .navigate('/page2');

      expect(page2RouteCb.calledOnce).to.be.true;
      expect(page1RouteCb.notCalled).to.be.true;
      expect(page3RouteCb.notCalled).to.be.true;
    });

    it('вызывает обработчик notFound, если маршрут не найден', () => {
      const pageRouteCb = Sinon.fake();
      const notFoundCb = Sinon.fake();

      router.addRoute('/page1', pageRouteCb);
      router.setNotFound(notFoundCb);
      router.navigate('/something');

      expect(pageRouteCb.notCalled).to.be.true;
      expect(notFoundCb.calledOnce).to.be.true;
    });
  });

  describe('resolve', () => {
    it('вызывает обработчик для текущего url', () => {
      const pageRouteCb = Sinon.fake();
      window.history.pushState({}, '', '/page');

      router.addRoute('/page', pageRouteCb);
      router.resolve();

      expect(pageRouteCb.calledOnce).to.be.true;
    });

    it('вызывает обработчик notFound, если текущего url нет среди маршрутов', () => {
      const pageRouteCb = Sinon.fake();
      const notFoundCb = Sinon.fake();
      window.history.pushState({}, '', '/something');

      router.addRoute('/page', pageRouteCb);
      router.setNotFound(notFoundCb);
      router.resolve();

      expect(notFoundCb.calledOnce).to.be.true;
      expect(pageRouteCb.notCalled).to.be.true;
    });
  });
});
