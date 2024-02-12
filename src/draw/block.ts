import { BlockInfo } from "../layout";
import { DrawLineOptions, drawLine } from "./line";
import { transformPosition2D } from "./position-math";
import {
  Axis,
  Placement1D,
  Placement2D,
  Position2D,
  placement1Dto2D,
} from "./types";

/**
 * Options for {@link drawBlock}
 *
 * @group Draw
 */
export interface DrawBlockOptions extends DrawLineOptions {
  /**
   * Alignment of the text within the block
   *
   * @default Placement1D.Left
   */
  textAlignment?: Placement1D;
}

/**
 * Takes a laid-out block of text lines from {@link layoutBlock},
 * and draws it onto the canvas.
 *
 * @group Draw
 */
export const drawBlock = (
  ctx: CanvasRenderingContext2D,
  block: BlockInfo,
  position: Position2D,
  {
    textAlignment = Placement1D.Start,
    drawFn,
    alignment,
    containerSize,
    origin,
  }: DrawBlockOptions = {},
) => {
  const { x: blockX, y: initialBlockY } = transformPosition2D(position, block, {
    alignment,
    containerSize,
    origin,
  });

  let accY = initialBlockY;
  for (const line of block.lines) {
    drawLine(
      ctx,
      line,
      { x: blockX, y: accY },
      {
        drawFn,
        alignment:
          Placement2D.Top | placement1Dto2D(textAlignment, Axis.Horizontal),
        containerSize,
        origin: Placement2D.TopLeft,
      },
    );

    accY += line.height;
  }
};
