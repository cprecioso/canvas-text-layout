import { trySplitters } from "./config";
import { checkWidth } from "./width";

const layoutLine = function* (
  text: string,
  { ctx, maxWidth }: LayoutLinesOptions,
): Iterable<LineInfo> {
  let currentLine: string | undefined = text;
  while (currentLine) {
    {
      // If the text fits on one line, just return it
      const { width, fits } = checkWidth(ctx, currentLine, maxWidth);
      if (fits) {
        yield { text: currentLine, width };
        return;
      }
    }

    const goodSplit = trySplitters(ctx, currentLine, maxWidth);

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

export interface LayoutLinesOptions {
  ctx: CanvasRenderingContext2D;
  maxWidth: number;
}

export interface LineInfo {
  text: string;
  width: number;
}

export const layoutLines = function* (
  ctx: CanvasRenderingContext2D,
  text: string,
  { maxWidth }: LayoutLinesOptions,
): Iterable<LineInfo> {
  for (const line of text.split("\n")) {
    yield* layoutLine(line, { ctx, maxWidth });
  }
};
