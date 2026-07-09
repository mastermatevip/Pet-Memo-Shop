/** Common UTF-8 punctuation misread as Latin-1/CP1252 or GBK in CMS JSON. */
const MOJIBAKE_REPLACEMENTS: ReadonlyArray<[string, string]> = [
  ["\u00e2\u20ac\u201d", "\u2014"],
  ["\u00e2\u20ac\u201c", "\u2014"],
  ["\u00e2\u20ac\u2013", "\u2013"],
  ["\u00e2\u20ac\u2019", "\u2019"],
  ["\u00e2\u20ac\u2018", "\u2018"],
  ["\u00e2\u20ac\u2026", "\u2026"],
  ["\u9225?", "\u2014"],
  ["\u9225\uFFFD", "\u2014"],
  ["\uFFFD?", "\u2014"],
  ["\ufeff", ""],
];

const MOJIBAKE_PATTERN = /\u00e2\u20ac|\u9225|\uFFFD\?|\ufeff/;

export function hasTextMojibake(text: string): boolean {
  return MOJIBAKE_PATTERN.test(text);
}

export function fixTextMojibake(text: string): string {
  if (!text) return text;

  let result = text;
  for (const [from, to] of MOJIBAKE_REPLACEMENTS) {
    if (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }

  if (result.includes("\u9225")) {
    result = result.replace(/\u9225/g, "\u2014");
  }

  return result;
}
