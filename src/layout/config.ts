import { SplitPosition, possibleSplits } from "./split";
import { getGoodSplit } from "./width";

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

export const trySplitters = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) => {
  for (const { regex, position } of POSSIBLE_SPLITTERS) {
    const splits = possibleSplits(text, regex, position);
    const goodSplit = getGoodSplit(ctx, splits, maxWidth);
    if (goodSplit) return goodSplit;
  }
};
