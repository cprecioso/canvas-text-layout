import {
  Axis,
  Placement1D,
  Placement2D,
  Position1D,
  Position2D,
  Size1D,
  Size2D,
  placement2Dto1D,
} from "./types";

const getMultiplier = (placement: Placement1D) => {
  switch (placement) {
    case Placement1D.Start:
      return 0;
    case Placement1D.Center:
      return 0.5;
    case Placement1D.End:
      return 1;
  }
};

const applyAlignment1D = (
  contentSize: Size1D,
  containerSize: Size1D,
  alignment: Placement1D,
): Position1D => {
  const multiplier = getMultiplier(alignment);
  return multiplier * (containerSize - contentSize);
};

const applyOrigin1D = (
  position: Position1D,
  size: Size1D,
  origin: Placement1D,
): Position1D => {
  const multiplier = getMultiplier(origin);
  return position - multiplier * size;
};

export interface TransformPosition1DOptions {
  alignment?: Placement1D;
  containerSize?: Size1D;
  origin?: Placement1D;
  position?: Position1D;
}

export const transformPosition1D = (
  initialPosition: Position1D,
  size: Size1D,
  {
    alignment = Placement1D.Start,
    containerSize = size,
    origin = Placement1D.Start,
  }: TransformPosition1DOptions = {},
): Position1D => {
  const originPosition = applyOrigin1D(initialPosition, containerSize, origin);
  const position =
    originPosition + applyAlignment1D(size, containerSize, alignment);
  return position;
};

export interface TransformPosition2DOptions {
  /**
   * How to fit the content to be drawn inside its container
   *
   * @default Placement2D.TopLeft
   */
  alignment?: Placement2D;
  /**
   * The size of the container where the content will be drawn
   *
   * @default {width: 0, height: 0}
   */
  containerSize?: Partial<Size2D>;
  /**
   * Set the origin of the content inside its container
   *
   * @default Placement2D.TopLeft
   */
  origin?: Placement2D;
}

export const transformPosition2D = (
  { x: initialX, y: initialY }: Position2D,
  { width, height }: Size2D,
  {
    alignment = Placement2D.TopLeft,
    containerSize: {
      width: containerWidth = 0,
      height: containerHeight = 0,
    } = {},
    origin = Placement2D.TopLeft,
  }: TransformPosition2DOptions = {},
): Position2D => {
  const x = transformPosition1D(initialX, width, {
    alignment: placement2Dto1D(alignment, Axis.Horizontal),
    containerSize: containerWidth,
    origin: placement2Dto1D(origin, Axis.Horizontal),
  });

  const y = transformPosition1D(initialY, height, {
    alignment: placement2Dto1D(alignment, Axis.Vertical),
    containerSize: containerHeight,
    origin: placement2Dto1D(origin, Axis.Vertical),
    position: initialY,
  });

  return { x, y };
};
