import { LineInBlock } from "../layout/block";
import { CommonDrawingInputOptions, parseCommonDrawingOptions } from "./common";

export interface LineLayoutDrawOptions extends CommonDrawingInputOptions {
  drawFn?: typeof _drawLineLayout;
}

export const _drawLineLayout = (
  ctx: CanvasRenderingContext2D,
  lineLayout: LineInBlock,
  options: LineLayoutDrawOptions,
) => {
  ctx.fillText(lineLayout.text, options.x, options.y);
};

export const drawLineLayout = (
  ctx: CanvasRenderingContext2D,
  lineLayout: LineInBlock,
  options?: Partial<LineLayoutDrawOptions>,
) => {
  const _options = parseCommonDrawingOptions(lineLayout, options);
  const drawFn = options?.drawFn ?? _drawLineLayout;
  return drawFn(ctx, lineLayout, _options);
};
