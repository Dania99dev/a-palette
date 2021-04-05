import { HSB, HSL, RGB } from "@/assets/utilities/types";

export function RGBtoHEX(rgb: RGB): string {
  function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  const res = {
    r: componentToHex(rgb.r),
    g: componentToHex(rgb.g),
    b: componentToHex(rgb.b),
  };

  return `#${res.r}${res.g}${res.b}`;
}

export function HEXtoRGB(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  } else {
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  }
}

export function RGBtoHSL(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = (max + min) / 2;
  let l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = h * 360;
  h = Math.round(h);
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  return {
    h,
    s,
    l,
  };
}

export function HSLtoRGB(hsl: HSL): RGB {
  hsl = {
    h: hsl.h / 360,
    s: hsl.s / 100,
    l: hsl.l / 100,
  };
  let r, g, b;
  function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (hsl.s == 0) {
    r = g = b = hsl.l;
  } else {
    const q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
    const p = 2 * hsl.l - q;
    r = hue2rgb(p, q, hsl.h + 1 / 3);
    g = hue2rgb(p, q, hsl.h);
    b = hue2rgb(p, q, hsl.h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function HSBtoHSL(hsb: HSB): HSL {
  // Takes hsb where h[0, 360] s[0, 100] b[0, 100]
  // Returns hsl where h[0, 360] l[0, 100] l[0, 100]
  const s = hsb.s / 100;
  const b = hsb.b / 100;
  let saturation;
  let lightness = b * (1 - s / 2);

  if (lightness === 0 || lightness === 1) {
    saturation = 0;
  } else {
    saturation = (b - lightness) / Math.min(lightness, 1 - lightness);
  }

  saturation = saturation * 100;
  lightness = lightness * 100;

  saturation = Math.round(saturation) <= 100 ? Math.round(saturation) : 100;
  lightness = Math.round(lightness) <= 100 ? Math.round(lightness) : 100;

  const res = {
    h: hsb.h,
    s: saturation,
    l: lightness,
  };

  return res;
}

export function HSLtoHSB(hsl: HSL): HSB {
  hsl = {
    h: hsl.h,
    s: hsl.s / 100,
    l: hsl.l / 100,
  };

  let b = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l);
  let s = b === 0 ? 2 : 2 * (1 - hsl.l / b);
  b = Math.round(b * 100);
  s = Math.round(s * 100);

  return {
    h: hsl.h,
    s,
    b,
  };
}
