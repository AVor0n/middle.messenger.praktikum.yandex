// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const removeProxy = (record: Record<string, unknown>) => JSON.parse(JSON.stringify(record));
