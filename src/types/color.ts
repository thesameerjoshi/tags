export const TAG_COLORS = [
  "#ff0701",
  "#fe8100",
  "#fcbc00",
  "#03c400",
  "#006ffb",
  "#a941cd",
  "#828186",
  "#c5eada",
] as const;

export type TagColor = (typeof TAG_COLORS)[number];
