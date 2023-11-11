import { type EventBus } from './eventBus';

/**
 * Декоратор аксессора.
 * При каждом изменении декорируемого поля вызывает событие `eventName` со старым и новым значением поля
 * @param eventName название события
 */
export function onChangeEvent<Value>(eventName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <This extends EventBus<any>>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    _context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value> => {
    let currentValue: Value;
    return {
      init(value: Value) {
        currentValue = value;
        return currentValue;
      },
      get() {
        return currentValue;
      },
      set(newValue: Value) {
        setTimeout(() => this.emit(eventName, newValue, currentValue));
        currentValue = newValue;
        return currentValue;
      },
    };
  };
}
