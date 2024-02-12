import { getFontValues } from "../util/canvas-font";
import { trySplitters } from "./config";
import { checkWidth } from "./width";

const layoutLine = function* (
  ctx: CanvasRenderingContext2D,
  text: string,
  {
    maxWidth,
    lineHeight: height = getFontValues(ctx).lineHeight,
  }: LayoutLinesOptions,
): Iterable<LineInfo> {
  let currentLine: string | undefined = text;
  while (currentLine) {
    {
      // If the text fits on one line, just return it
      const { width, fits } = checkWidth(ctx, currentLine, maxWidth);
      if (fits) {
        yield { text: currentLine, width, height };
        return;
      }
    }

    const goodSplit = trySplitters(ctx, currentLine, maxWidth);

    if (goodSplit == null) {
      yield { text: currentLine, width: maxWidth, height };
      return;
    } else {
      const { lineText, rest, width } = goodSplit;
      yield { text: lineText, width, height };
      currentLine = rest; // Do again with the rest of the lines
    }
  }
};

/**
 * Options for {@link layoutLines}
 *
 * @group Layout
 */
export interface LayoutLinesOptions {
  /** Maximum width the text is allowed to use. Lines longer than this will be split. */
  maxWidth: number;
  /**
   * The height of each line.
   * @default fontSize * 1.2
   */
  lineHeight?: number;
}

/**
 * Text lines with their layout information
 *
 * @group Layout
 */
export interface LineInfo {
  /** Text content of the line */
  text: string;
  /** Width of the line */
  width: number;
  /** Height of the line */
  height: number;
}

/**
 * Takes a line of text, and splits it into multiple lines if it's too wide.
 *
 * Returns an iterable of lines, each its text for that line, and the width
 * it takes to render.
 *
 * **IMPORTANT**: Set the font and other styles on the canvas context before
 * calling this function, as the measurements are based on the current styles.
 *
 * @remark
 * It will split the text with the following algorithm:
 *
 * - It will first split newlines, and process each line separately.
 *
 * - For each line, it will try the following splits, in order. If at any point
 *   the line is found to fit, it will stop searching.
 *
 *   1. Split on the earliest whitespace possible, and remove the whitespace.
 *   2. Split on hyphens, figure dashes, en dashes, and em dashes. Keep them in
 *     both the end of the first line and the start of the second line.
 *   3. Split on word boundaries (from an alphanumeric to anything else)
 *   4. Split anywhere.
 *
 * @group Layout
 */
export const layoutLines = function* (
  ctx: CanvasRenderingContext2D,
  text: string,
  { maxWidth, lineHeight }: LayoutLinesOptions,
): Iterable<LineInfo> {
  for (const line of text.split("\n")) {
    yield* layoutLine(ctx, line, { maxWidth, lineHeight });
  }
};
