// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const removeProxy = <T extends Record<string, unknown>>(record: T): T => JSON.parse(JSON.stringify(record));

export const clsx = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');
