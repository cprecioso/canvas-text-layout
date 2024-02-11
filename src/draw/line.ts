import { LineInfo } from "../layout";
import { getFontValues } from "../util/canvas-font";
import {
  TransformPosition2DOptions,
  transformPosition2D,
} from "./position-math";
import { Position2D } from "./types";

const defaultDrawFn = CanvasRenderingContext2D.prototype.fillText;

export interface DrawLineOptions extends TransformPosition2DOptions {
  drawFn?: typeof defaultDrawFn;
  lineHeight?: number;
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  { text, width }: LineInfo,
  position: Position2D,
  {
    drawFn = defaultDrawFn,
    lineHeight: height = getFontValues(ctx).lineHeight,
    alignment,
    containerSize,
    origin,
  }: DrawLineOptions = {},
) => {
  const { x, y } = transformPosition2D(
    position,
    { width, height },
    { alignment, containerSize, origin },
  );
  const maxWidth = containerSize?.width;
  return drawFn.call(ctx, text, x, y, maxWidth);
};
