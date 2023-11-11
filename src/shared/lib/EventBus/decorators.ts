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
      get() {
        return currentValue;
      },
      set(newValue: Value) {
        const oldValue = currentValue;
        currentValue = newValue;
        setTimeout(() => {
          this.emit(eventName, newValue, oldValue);
        });
        return currentValue;
      },
    };
  };
}
