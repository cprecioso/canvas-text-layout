import { possibleSplits } from "./split";
import { Context, LineInfo, SplitPosition } from "./types";
import { checkWidth, getGoodSplit } from "./width";

// All the possible splitters, in order of preference
const POSSIBLE_SPLITTERS: readonly {
  readonly regex: RegExp;
  readonly position: SplitPosition;
}[] = [
  {
    // whitespace
    regex: /\s/g,
    position: SplitPosition.RemoveSplitter,
  },
  {
    // hyphen, figure dash, en dash, em dash
    regex: /[-\u2012\u2013\u2014]/g,
    position: SplitPosition.DuplicateSplitter,
  },
  {
    // word boundaries
    regex: /\b/g,
    position: SplitPosition.RightOfSplitter,
  },
  {
    // anywhere
    regex: /./g,
    position: SplitPosition.RightOfSplitter,
  },
];

const trySplitters = (text: string, { ctx, maxWidth }: Context) => {
  for (const { regex, position } of POSSIBLE_SPLITTERS) {
    const splits = possibleSplits(text, regex, position);
    const goodSplit = getGoodSplit(splits, { ctx, maxWidth });
    if (goodSplit) return goodSplit;
  }
};

const layoutLine = function* (
  text: string,
  { ctx, maxWidth }: Context,
): Iterable<LineInfo> {
  let currentLine: string | undefined = text;
  while (currentLine) {
    {
      // If the text fits on one line, just return it
      const { width, fits } = checkWidth(currentLine, { ctx, maxWidth });
      if (fits) {
        yield { text: currentLine, width };
        return;
      }
    }

    const goodSplit = trySplitters(currentLine, { ctx, maxWidth });

    if (goodSplit == null) {
      yield { text: currentLine, width: maxWidth };
      return;
    } else {
      const { lineText, rest, width } = goodSplit;
      yield { text: lineText, width };
      currentLine = rest; // Do again with the rest of the lines
    }
  }
};

export const layoutLines = function* (
  text: string,
  { ctx, maxWidth }: Context,
): Iterable<LineInfo> {
  for (const line of text.split("\n")) {
    yield* layoutLine(line, { ctx, maxWidth });
  }
};

export * from "./types";
