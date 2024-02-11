import * as it from "@cprecioso/iterable-helpers";

export const checkWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) => {
  const { width } = ctx.measureText(text);
  const fits = width <= maxWidth;
  return { width, fits };
};

export const getGoodSplit = (
  ctx: CanvasRenderingContext2D,
  splits: Iterable<[head: string, tail?: string]>,
  maxWidth: number,
) =>
  it
    .lazy(splits)
    .pipe(
      it.map(([lineText, rest]) => {
        const { fits, width } = checkWidth(ctx, lineText, maxWidth);
        return { lineText, rest, width, fits };
      }),
    )
    .pipe(it.takeWhile(({ fits }) => fits))
    .fold(it.last());
