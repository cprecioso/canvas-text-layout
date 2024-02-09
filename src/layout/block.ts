import { layoutLine, LineLayout } from "./line";

export interface BlockLayout {
  lines: LineLayout[];
  width: number;
  height: number;
}

export const layoutBlock = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number,
) => {
  const lines: LineLayout[] = [];
  let width = 0;
  let height = 0;

  for (const lineText of text.split("\n")) {
    for (const line of layoutLine(ctx, lineText, maxWidth, lineHeight)) {
      lines.push(line);
      width = Math.max(width, line.width);
      height += line.height;
    }
  }

  return { lines, width, height };
};
