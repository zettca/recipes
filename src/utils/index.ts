export function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}
