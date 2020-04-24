import { BlockLayout } from "../layout/block"
import {
  Alignment,
  CommonDrawingInputOptions,
  Origin,
  parseCommonDrawingOptions,
} from "./common"
import { drawLineLayout, LineLayoutDrawOptions } from "./line"

export interface BlockLayoutDrawOptions
  extends Omit<CommonDrawingInputOptions, "width" | "height"> {
  lineOptions?: Partial<LineLayoutDrawOptions>
}

export const _drawBlockLayout = (
  ctx: CanvasRenderingContext2D,
  blockLayout: BlockLayout,
  options: BlockLayoutDrawOptions,
  lineOptions?: Partial<LineLayoutDrawOptions>
) => {
  let accY = options.y
  for (const line of blockLayout.lines) {
    accY += line.height
    drawLineLayout(ctx, line, {
      x: options.x,
      y: accY,
      origin: Origin.Top | Origin.Left,
      containerHeight: blockLayout.height,
      containerWidth: blockLayout.width,
      verticalAlignment: Alignment.Start,
      horizontalAlignment: options.horizontalAlignment,
      ...lineOptions,
    })
  }
}

export const drawBlockLayout = (
  ctx: CanvasRenderingContext2D,
  blockLayout: BlockLayout,
  options?: Partial<BlockLayoutDrawOptions>
) => {
  const _options = parseCommonDrawingOptions(blockLayout, options)
  return _drawBlockLayout(ctx, blockLayout, _options, options?.lineOptions)
}
