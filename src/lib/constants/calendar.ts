export const HOURS = Array.from({ length: 24 }, (_, i) => i);
export const MINUTES_PER_SLOT = 15;
export const SLOTS_PER_HOUR = 60 / MINUTES_PER_SLOT;
export const CELL_HEIGHT = 16;

export const COLOR_CLASSES = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  yellow: "bg-yellow-100 text-yellow-800",
  pink: "bg-pink-100 text-pink-800",
} as const;
