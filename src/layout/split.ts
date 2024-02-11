import { SplitPosition } from "./types";

const calculateSplit = (
  match: RegExpMatchArray,
  splitPosition: SplitPosition,
): [endOfFirstSplit: number, startOfSecondSplit: number] => {
  const leftIndex = match.index!; // This is safe because we're in a matchAll loop
  const rightIndex = leftIndex + match[0].length;

  switch (splitPosition) {
    case SplitPosition.LeftOfSplitter:
      return [leftIndex, leftIndex];

    case SplitPosition.RightOfSplitter:
      return [rightIndex, rightIndex];

    case SplitPosition.RemoveSplitter:
      return [leftIndex, rightIndex];

    case SplitPosition.DuplicateSplitter:
      return [rightIndex, leftIndex];
  }
};

export const possibleSplits = function* (
  text: string,
  splitter: RegExp,
  splitPosition = SplitPosition.LeftOfSplitter,
): Iterable<[head: string, tail?: string]> {
  for (const match of text.matchAll(splitter)) {
    const [headEndIndex, tailStartIndex] = calculateSplit(match, splitPosition);

    const head = text.slice(0, headEndIndex);
    const tail = text.slice(tailStartIndex);

    yield [head, tail];
  }
};
