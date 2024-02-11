import { LineInfo } from "../layout";
import { getFontValues } from "../util/canvas-font";
import { DrawLineOptions, drawLine } from "./line";
import { transformPosition2D } from "./position-math";
import {
  Axis,
  Placement1D,
  Placement2D,
  Position2D,
  placement1Dto2D,
} from "./types";

export interface DrawLineBlockOptions extends DrawLineOptions {
  textAlignment?: Placement1D;
}

export const drawLineBlock = (
  ctx: CanvasRenderingContext2D,
  lines_: Iterable<LineInfo>,
  position: Position2D,
  {
    textAlignment = Placement1D.Start,
    drawFn,
    lineHeight = getFontValues(ctx).lineHeight,
    alignment,
    containerSize,
    origin,
  }: DrawLineBlockOptions = {},
) => {
  const lines = Array.from(lines_);

  const blockHeight = lineHeight * lines.length;
  const blockWidth = lines.reduce(
    (maxWidth, line) => Math.max(maxWidth, line.width),
    0,
  );

  const { x: blockX, y: initialBlockY } = transformPosition2D(
    position,
    { width: blockWidth, height: blockHeight },
    { alignment, containerSize, origin },
  );

  let accY = initialBlockY;
  for (const line of lines) {
    drawLine(
      ctx,
      line,
      { x: blockX, y: accY },
      {
        drawFn,
        lineHeight,
        alignment:
          Placement2D.Top | placement1Dto2D(textAlignment, Axis.Horizontal),
        containerSize,
        origin: Placement2D.TopLeft,
      },
    );

    accY += lineHeight;
  }
};
