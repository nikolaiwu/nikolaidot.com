// A 7-pixel-tall bitmap font with only the letters the site spells out.
const glyphs: Record<string, string[]> = {
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  Д: ["01111", "01001", "01001", "01001", "01001", "11111", "10001"],
  З: ["01110", "10001", "00001", "00110", "00001", "10001", "01110"],
  Р: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
};

/** Rows of "1" and "0", one pixel apart between letters. */
export function pixelText(text: string) {
  const letters = [...text.toUpperCase()].map((char) => {
    const glyph = glyphs[char];
    if (!glyph) throw new Error(`No pixel glyph for "${char}"`);
    return glyph;
  });
  return letters[0].map((_, row) =>
    letters.map((glyph) => glyph[row]).join("0"),
  );
}
