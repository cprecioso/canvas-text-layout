export enum SplitPosition {
  LeftOfSplitter,
  RightOfSplitter,
  RemoveSplitter,
  DuplicateSplitter,
}

export interface Context {
  ctx: CanvasRenderingContext2D;
  maxWidth: number;
}

export interface LineInfo {
  text: string;
  width: number;
}
