export function lightenColor(hex: string, amount: number = 0.7): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  const blend = (channel: number) =>
    Math.round(channel + (255 - channel) * amount);

  const toHex = (channel: number) =>
    blend(channel).toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
