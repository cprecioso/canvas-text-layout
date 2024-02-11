export type Position1D = number;
export interface Position2D {
  x: number;
  y: number;
}

export type Size1D = number;
export interface Size2D {
  width: number;
  height: number;
}

/*
  Placement
  =======================

  This code uses some bit manipulation to represent 1D and 2D placements.
  This is useful for representing alignments and origins in a single value.

  Placement1D:
  `001` = Start
  `010` = Center
  `100` = End

  Placement2D:
  `xxxyyy`
    - xxx is Placement1D for the vertical axis
    - yyy is Placement1D for the horizontal axis

  Working in this way, we can use bitwise operations to extract the values for each axis.

  myPlacement1D & Placement1D.Center -> Is the placement centered?
  myPlacement2D = Placement2D.Top | Placement2D.Left -> Combine parts of a 2D placement
  myPlacement2D = myPlacement1D << Axis.Horizontal -> Convert a 1D placement to a 2D placement
*/

export enum Placement1D {
  Start = 1 << 0,
  Center = 1 << 1,
  End = 1 << 2,
}

/*
  IMPORTANT - This value must be kept in sync with the number of bits used to represent
  each value in the enum, so we know how much to shift the bits for each axis.
*/
const size = 3;

export enum Axis {
  Horizontal = 0 * size,
  Vertical = 1 * size,
}

export enum Placement2D {
  Top = Placement1D.Start << Axis.Vertical,
  VerticalCenter = Placement1D.Center << Axis.Vertical,
  Bottom = Placement1D.End << Axis.Vertical,

  Left = Placement1D.Start << Axis.Horizontal,
  HorizontalCenter = Placement1D.Center << Axis.Horizontal,
  Right = Placement1D.End << Axis.Vertical,

  // Shorthand values
  TopLeft = Top | Left,
  TopCenter = Top | HorizontalCenter,
  TopRight = Top | Right,

  CenterLeft = VerticalCenter | Left,
  Center = VerticalCenter | HorizontalCenter,
  CenterRight = VerticalCenter | Right,

  BottomLeft = Bottom | Left,
  BottomCenter = Bottom | HorizontalCenter,
  BottomRight = Bottom | Right,
}

const mask = (1 << size) - 1;
export const placement1Dto2D = (
  placement: Placement1D,
  axis: Axis,
): Placement2D => (placement & mask) << axis;

export const placement2Dto1D = (
  placement: Placement2D,
  axis: Axis,
): Placement1D => (placement >> axis) & mask;

export enum Placement2D {}
