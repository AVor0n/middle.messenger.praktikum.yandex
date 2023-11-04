import { generateId } from '..';

test('generateId', () => {
  const length = 10_000;
  const ids = Array.from({ length }, () => generateId());
  const uniqueIds = new Set(ids);
  expect(ids.length).toBe(uniqueIds.size);
});
