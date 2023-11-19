import { expect } from 'chai';
import { generateId } from '../generateId.ts';

it('generateId', () => {
  const length = 10_000;
  const ids = Array.from({ length }, () => generateId());
  const uniqueIds = new Set(ids);
  expect(ids.length === uniqueIds.size);
});
