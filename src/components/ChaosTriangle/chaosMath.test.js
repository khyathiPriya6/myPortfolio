import { createChaosPoints, MAX_POINTS } from './chaosMath';

test('generates a reproducible point sequence', () => {
  expect(createChaosPoints(0.5, 30)).toEqual(createChaosPoints(0.5, 30));
});

test('supports the Haskell experiment and classic Sierpinski modes', () => {
  const classic = createChaosPoints(0.5, 20);
  const original = createChaosPoints(0.75, 20);
  expect(classic).toHaveLength(20);
  expect(original).toHaveLength(20);
  expect(classic).not.toEqual(original);
  expect(classic.every(({ x, y }) => x >= 0 && x <= 1 && y >= 0 && y <= 1)).toBe(true);
});

test('defaults to 16,000 points and rejects invalid ratios', () => {
  expect(createChaosPoints(0.5)).toHaveLength(MAX_POINTS);
  expect(() => createChaosPoints(1, 1)).toThrow(RangeError);
});
