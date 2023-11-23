import { expect } from 'chai';
import { generateId } from '../generateId.ts';

describe('generateId', () => {
  it('Генерируются уникальные значения', () => {
    const length = 10_000;
    const ids = Array.from({ length }, () => generateId());
    const uniqueIds = new Set(ids);
    expect(ids.length).to.equal(uniqueIds.size);
  });
});
