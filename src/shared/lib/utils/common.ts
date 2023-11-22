export const removeProxy = <T extends Record<string, unknown>>(record: T): T => JSON.parse(JSON.stringify(record)) as T;

export const clsx = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

export const sleep = (duration: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
