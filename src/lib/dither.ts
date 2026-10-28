// Ordered dithering at build time: a density field becomes square pixels in a
// single SVG path, so it costs no JavaScript in the browser.

// 4×4 Bayer matrix as 0–1 thresholds.
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (value) => (value + 0.5) / 16,
);

/**
 * Pixels for a cols × rows grid. `density(x, y)` is 0–1, and `noise` adds that
 * much seeded jitter, so every build draws the same pixels.
 */
export function ditherPath(
  cols: number,
  rows: number,
  density: (x: number, y: number) => number,
  { noise = 0.35, seed = 7 } = {},
) {
  let state = seed;
  const random = () => (state = (state * 1664525 + 1013904223) >>> 0) / 2 ** 32;

  let path = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const value = density(x, y) + (random() - 0.5) * noise;
      if (value > bayer[(y % 4) * 4 + (x % 4)]) path += `M${x} ${y}h1v1h-1z`;
    }
  }
  return path;
}
