import { expect } from 'chai';
import sinon from 'sinon';
import { EventBus } from './eventBus.ts';

describe('EventBus', () => {
  it('Подписка на событие', () => {
    const handler = sinon.stub();
    const eventBus = new EventBus<{ testEvent: () => void }>();
    eventBus.on('testEvent', handler);
    expect(handler.callCount).to.equal(0);

    eventBus.emit('testEvent');
    expect(handler.callCount).to.equal(1);

    eventBus.emit('testEvent');
    eventBus.emit('testEvent');
    expect(handler.callCount).to.equal(3);
  });

  it('Несколько подписчиков', () => {
    const handler1 = sinon.stub();
    const handler2 = sinon.stub();
    const eventBus = new EventBus<{ testEvent: () => void }>();
    eventBus.on('testEvent', handler1);
    eventBus.on('testEvent', handler2);

    eventBus.emit('testEvent');
    expect(handler1.calledOnce).to.be.true;
    expect(handler2.calledOnce).to.be.true;
  });

  it('Несколько событий', () => {
    const handler = sinon.stub<[string], undefined>();
    const eventBus = new EventBus<{ testEvent1: () => void; testEvent2: () => void }>();
    eventBus.on('testEvent1', () => handler('event1'));
    eventBus.on('testEvent2', () => handler('event2'));

    eventBus.emit('testEvent1');
    eventBus.emit('testEvent2');
    expect(handler.callCount).to.equal(2);
    expect(handler.calledWith('event1')).to.be.true;
    expect(handler.calledWith('event2')).to.be.true;
  });

  it('Передача параметров в обработчик', () => {
    const handler = sinon.stub();
    const arg1 = 'primitive';
    const arg2 = { test: null };
    const eventBus = new EventBus<{ testEvent: (arg1: string, arg2: { test: null }) => void }>();
    eventBus.on('testEvent', handler);

    eventBus.emit('testEvent', arg1, arg2);
    expect(handler.calledWith(arg1, arg2)).to.be.true;
  });

  it('Отписка от события', () => {
    const handler = sinon.stub();
    const eventBus = new EventBus<{ testEvent: () => void }>();
    eventBus.on('testEvent', handler);
    eventBus.off('testEvent', handler);

    eventBus.emit('testEvent');
    expect(handler.notCalled).to.be.true;
  });

  it('Одноразовая подписка', () => {
    const handler = sinon.stub();
    const eventBus = new EventBus<{ testEvent: () => void }>();
    eventBus.once('testEvent', handler);

    eventBus.emit('testEvent');
    eventBus.emit('testEvent');
    expect(handler.callCount).to.be.equal(1);
  });

  it('Функция подписки возвращает функцию отписки', () => {
    const handler = sinon.stub();
    const eventBus = new EventBus<{ testEvent: () => void }>();
    const disposer = eventBus.on('testEvent', handler);
    disposer();

    eventBus.emit('testEvent');
    expect(handler.notCalled).to.be.true;
  });
});
