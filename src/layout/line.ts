export interface LineLayout {
  text: string
  width: number
  height: number
}

export const layoutLine = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number
): LineLayout[] => {
  const { width } = ctx.measureText(text)
  if (width <= maxWidth) {
    return [{ text, width, height: lineHeight }]
  } else {
    const re = /\s/g

    type Trial = {
      endIndex: number
      nextIndex: number | null
      width: number
      lineText: string
    }

    let knownGood: Trial | null = null

    while (true) {
      const matches = re.exec(text)

      const endIndex = matches != null ? matches.index : text.length
      const nextIndex = matches != null ? re.lastIndex : null

      const lineText = text.slice(0, endIndex).trim()
      const { width } = ctx.measureText(lineText)

      const trial: Trial = { endIndex, nextIndex, lineText, width }

      if (width <= maxWidth) {
        knownGood = trial
      } else {
        break
      }
    }

    if (knownGood == null) {
      return [{ text: text, width: maxWidth, height: lineHeight }]
    } else {
      return [
        {
          text: knownGood.lineText,
          width: ctx.measureText(knownGood.lineText).width,
          height: lineHeight,
        },
        ...(knownGood.nextIndex != null
          ? layoutLine(
              ctx,
              text.slice(knownGood.nextIndex),
              maxWidth,
              lineHeight
            )
          : []),
      ]
    }
  }
}
