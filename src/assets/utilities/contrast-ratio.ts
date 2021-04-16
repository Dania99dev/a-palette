import { HEXtoRGB } from "./color-conversion";

export function ratioNumber(textColor: string, bgColor: string): number {
  const textColorRGB = HEXtoRGB(textColor);
  const bgColorRGB = HEXtoRGB(bgColor);

  // * Calculates Text Luminance
  const redText = textColorRGB.r / 255;
  const greenText = textColorRGB.g / 255;
  const blueText = textColorRGB.b / 255;
  let textR, textG, textB;

  if (redText <= 0.03928) {
    textR = redText / 12.92;
  } else {
    textR = ((redText + 0.055) / 1.055) ** 2.4;
  }
  if (greenText <= 0.03928) {
    textG = greenText / 12.92;
  } else {
    textG = ((greenText + 0.055) / 1.055) ** 2.4;
  }
  if (blueText <= 0.03928) {
    textB = blueText / 12.92;
  } else {
    textB = ((blueText + 0.055) / 1.055) ** 2.4;
  }
  const textL = 0.2126 * textR + 0.7152 * textG + 0.0722 * textB;

  // * Calculates Background Luminance
  const redBg = bgColorRGB.r / 255;
  const greenBg = bgColorRGB.g / 255;
  const blueBg = bgColorRGB.b / 255;
  let bgR, bgG, bgB;

  if (redBg <= 0.03928) {
    bgR = redBg / 12.92;
  } else {
    bgR = ((redBg + 0.055) / 1.055) ** 2.4;
  }
  if (greenBg <= 0.03928) {
    bgG = greenBg / 12.92;
  } else {
    bgG = ((greenBg + 0.055) / 1.055) ** 2.4;
  }
  if (blueBg <= 0.03928) {
    bgB = blueBg / 12.92;
  } else {
    bgB = ((blueBg + 0.055) / 1.055) ** 2.4;
  }
  const bgL = 0.2126 * bgR + 0.7152 * bgG + 0.0722 * bgB;

  if (bgL > textL) {
    const ratioLeftNum =
      Math.round(((bgL + 0.05) / (textL + 0.05) + Number.EPSILON) * 100) / 100;
    return ratioLeftNum;
  } else {
    const ratioLeftNum =
      Math.round(((textL + 0.05) / (bgL + 0.05) + Number.EPSILON) * 100) / 100;
    return ratioLeftNum;
  }
}

export function ratioString(textColor: string, bgColor: string): string {
  const leftNum = ratioNumber(textColor, bgColor);
  return `${leftNum}:1`;
}
