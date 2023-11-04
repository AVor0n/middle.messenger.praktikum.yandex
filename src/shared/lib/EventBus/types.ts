// unknown не подходит
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventHandler<T = any> = (...args: T[]) => void;
export type EventMap = Record<string, EventHandler>;
export type EventRegistry<E> = Record<keyof E, E[keyof E][]>;

export interface IEventBus<Events extends EventMap> {
  on<Key extends keyof Events>(event: Key, handler: Events[Key]): () => void;
  off<Key extends keyof Events>(event: Key, handler: Events[Key]): void;
  emit<Key extends keyof Events>(event: Key, ...args: Parameters<Events[Key]>): void;
}
