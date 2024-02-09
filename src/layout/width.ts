import * as lazy from "../util/lazy";
import { Context } from "./types";

export const checkWidth = (text: string, { ctx, maxWidth }: Context) => {
  const { width } = ctx.measureText(text);
  const fits = width <= maxWidth;
  return { width, fits };
};

export const getGoodSplit = (
  splits: Iterable<[head: string, tail?: string]>,
  { ctx, maxWidth }: Context,
) =>
  lazy
    .from(splits)
    .pipe(
      lazy.map(([lineText, rest]) => {
        const { fits, width } = checkWidth(lineText, { ctx, maxWidth });
        return { lineText, rest, width, fits };
      }),
    )
    .pipe(lazy.takeWhile(({ fits }) => fits))
    .fold(lazy.last());
