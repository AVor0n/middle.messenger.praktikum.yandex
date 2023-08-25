import { EventBus } from './eventBus';

test('Подписка на событие', () => {
  const handler = vi.fn();
  const eventBus = new EventBus<{ testEvent: () => void }>();

  eventBus.on('testEvent', handler);
  expect(handler).not.toBeCalled();

  eventBus.emit('testEvent');
  expect(handler).toBeCalledTimes(1);

  eventBus.emit('testEvent');
  eventBus.emit('testEvent');
  expect(handler).toBeCalledTimes(3);
});

test('Несколько подписчиков', () => {
  const handler1 = vi.fn();
  const handler2 = vi.fn();
  const eventBus = new EventBus<{ testEvent: () => void }>();

  eventBus.on('testEvent', handler1);
  eventBus.on('testEvent', handler2);

  eventBus.emit('testEvent');
  expect(handler1).toBeCalledTimes(1);
  expect(handler2).toBeCalledTimes(1);
});

test('Несколько событий', () => {
  const handler = vi.fn<[string], undefined>();
  const eventBus = new EventBus<{
    testEvent1: () => void;
    testEvent2: () => void;
  }>();

  eventBus.on('testEvent1', () => handler('event1'));
  eventBus.on('testEvent2', () => handler('event2'));

  eventBus.emit('testEvent1');
  eventBus.emit('testEvent2');

  expect(handler).toBeCalledTimes(2);
  expect(handler).toBeCalledWith('event1');
  expect(handler).toBeCalledWith('event2');
});

test('Передача параметров в обработчик', () => {
  const handler = vi.fn();

  const arg1 = 'primitive';
  const arg2 = { test: null };

  const eventBus = new EventBus<{ testEvent: (a1: string, a2: typeof arg2) => void }>();
  eventBus.on('testEvent', handler);

  eventBus.emit('testEvent', arg1, arg2);
  expect(handler).toBeCalledWith(arg1, arg2);
});

test('Отписка от события', () => {
  const handler = vi.fn();
  const eventBus = new EventBus<{ testEvent: () => void }>();

  eventBus.on('testEvent', handler);
  eventBus.off('testEvent', handler);

  eventBus.emit('testEvent');
  expect(handler).toBeCalledTimes(0);
});

test('Функция подписки возвращает функцию отписки', () => {
  const handler = vi.fn();
  const eventBus = new EventBus<{ testEvent: () => void }>();

  const disposer = eventBus.on('testEvent', handler);
  disposer();

  eventBus.emit('testEvent');
  expect(handler).toBeCalledTimes(0);
});
