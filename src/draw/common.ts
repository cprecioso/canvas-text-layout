import { BlockLayout } from "../layout/block"
import { LineLayout } from "../layout/line"

export enum Alignment {
  Start = "left",
  Middle = "center",
  End = "right",
}

export const applyAlignment = (
  contentSize: number,
  containerSize: number,
  alignment: Alignment
) => {
  switch (alignment) {
    case Alignment.Start:
      return 0
    case Alignment.Middle:
      return containerSize / 2 - contentSize / 2
    case Alignment.End:
      return containerSize - contentSize
  }
}

export enum Origin {
  Top = 0b00,
  Bottom = 0b01,
  Left = 0b00,
  Right = 0b10,
}

export const applyOrigin = (
  x: number,
  y: number,
  w: number,
  h: number,
  origin: Origin
) => ({
  x: x - (origin & Origin.Right ? w : 0),
  y: y - (origin & Origin.Bottom ? h : 0),
})

export interface CommonDrawingInputOptions {
  horizontalAlignment: Alignment
  verticalAlignment: Alignment
  x: number
  y: number
  containerWidth: number
  containerHeight: number
  origin: Origin
}

export const parseCommonDrawingOptions = (
  layout: LineLayout | BlockLayout,
  options: Partial<CommonDrawingInputOptions> = {}
): CommonDrawingInputOptions => {
  const {
    horizontalAlignment,
    verticalAlignment,
    containerWidth,
    containerHeight,
    origin,
  }: Omit<CommonDrawingInputOptions, "x" | "y"> = {
    horizontalAlignment: Alignment.Start,
    verticalAlignment: Alignment.Start,
    containerWidth: layout.width,
    containerHeight: layout.height,
    origin: Origin.Top | Origin.Left,
    ...options,
  }

  const { x: originX, y: originY } = applyOrigin(
    options.x ?? 0,
    options.y ?? 0,
    containerWidth,
    containerHeight,
    options.origin ?? Origin.Top | Origin.Left
  )

  const x =
    originX + applyAlignment(layout.width, containerWidth, horizontalAlignment)
  const y =
    originY + applyAlignment(layout.height, containerHeight, verticalAlignment)

  return {
    horizontalAlignment,
    verticalAlignment,
    containerWidth,
    containerHeight,
    origin,
    x,
    y,
  }
}
