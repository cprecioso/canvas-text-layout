export const getFontValues = (ctx: CanvasRenderingContext2D) => {
  // https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-font
  const fontProperty = ctx.font; // This is always normalized
  const fontSizePx = fontProperty
    .split(" ")
    .find((part) => part.endsWith("px"))!; // There always is one
  const fontSize = parseFloat(fontSizePx.slice(0, -2));
  const lineHeight = fontSize * 1.2; // This is a magic number, always forced to the "normal" value, which usually is 1.2
  return { fontSize, lineHeight };
};
