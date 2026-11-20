// Browser port of the point-selection rule from the original Haskell / Gloss project.
// A fixed seed makes replay deterministic. This is not the Haskell random number generator.
export const VERTICES = [
  { x: 0.5, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const MAX_POINTS = 16000;

export function createChaosPoints(fraction, iterations = MAX_POINTS, seed = 42) {
  if (fraction <= 0 || fraction >= 1) {
    throw new RangeError('The movement fraction must be between 0 and 1');
  }

  const points = [];
  let x = 0.5;
  let y = 0.5;
  let state = seed >>> 0;

  // Skip the first few choices while the starting position settles.
  for (let i = 0; i < iterations + 15; i += 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const vertexIndex = Math.floor((state / 4294967296) * 3);
    const vertex = VERTICES[vertexIndex];

    x += fraction * (vertex.x - x);
    y += fraction * (vertex.y - y);

    if (i >= 15) points.push({ x, y, vertexIndex });
  }

  return points;
}
