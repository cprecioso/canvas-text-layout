import { LineInfo } from "../layout";
import {
  TransformPosition2DOptions,
  transformPosition2D,
} from "./position-math";
import { Position2D } from "./types";

const defaultDrawFn = CanvasRenderingContext2D.prototype.fillText;

/**
 * Options for {@link drawLine}
 *
 * @group Draw
 */
export interface DrawLineOptions extends TransformPosition2DOptions {
  /**
   * Function called to draw the text on the canvas.
   *
   * By default, it is
   * [`ctx.fillText`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText).
   *
   * Provided in case you want to, for example, draw an outline in
   * a bigger font for each line.
   */
  drawFn?: typeof defaultDrawFn;
}

/**
 * Takes a laid-out line of text from {@link layoutLines},
 * and draws it onto the canvas.
 *
 * @group Draw
 */
export const drawLine = (
  ctx: CanvasRenderingContext2D,
  line: LineInfo,
  position: Position2D,
  {
    drawFn = defaultDrawFn,
    alignment,
    containerSize,
    origin,
  }: DrawLineOptions = {},
) => {
  const { x, y } = transformPosition2D(position, line, {
    alignment,
    containerSize,
    origin,
  });
  const maxWidth = containerSize?.width;
  return drawFn.call(ctx, line.text, x, y, maxWidth);
};
