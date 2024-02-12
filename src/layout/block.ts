import * as it from "@cprecioso/iterable-helpers";
import { LayoutLinesOptions, LineInfo, layoutLines } from "./line";

/**
 * Options for {@link layoutBlock}
 *
 * @group Layout
 */
export interface LayoutBlockOptions extends LayoutLinesOptions {}

/**
 * @group Layout
 */
export interface BlockInfo {
  /** Lines that conform the block */
  lines: LineInfo[];
  /** Width the block takes */
  width: number;
  /** Height the block takes */
  height: number;
}

/**
 * Takes some text and lays it out as a block of lines.
 *
 * Check the algorithm to split the lines at {@link layoutLines}
 *
 * **IMPORTANT**: Set the font and other styles on the canvas context before
 * calling this function, as the measurements are based on the current styles.
 *
 * @group Layout
 */
export const layoutBlock = (
  ctx: CanvasRenderingContext2D,
  text: string,
  options: LayoutLinesOptions,
): BlockInfo =>
  it.lazy(layoutLines(ctx, text, options)).fold(
    it.reduce(
      ({ lines, height, width }, line) => ({
        lines: (lines.push(line), lines),
        height: height + line.height,
        width: Math.max(line.width, width),
      }),
      { lines: [] as LineInfo[], height: 0, width: 0 },
    ),
  );
