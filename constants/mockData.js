import { useMemo } from "react";
export const monthValues = [
  { key: 1, value: "Jan" },
  { key: 2, value: "Feb" },
  { key: 3, value: "Mar" },
  { key: 4, value: "Apr" },
  { key: 5, value: "May" },
  { key: 6, value: "Jun" },
  { key: 7, value: "Jul" },
  { key: 8, value: "Aug" },
  { key: 9, value: "Sep" },
  { key: 10, value: "Oct" },
  { key: 11, value: "Nov" },
  { key: 12, value: "Dec" },
];
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const daysSource = Array.from({ length: 31 }, (_, i) => i + 1);

export const dataWeight = Array.from({ length: 130 }, (_, i) => i + 1);
export const dataHeight = Array.from({ length: 160 }, (_, i) => i + 51);
