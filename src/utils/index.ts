export function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function parseTags(tags?: string | null) {
  return (tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
