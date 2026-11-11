export function normalizeGallery(image?: string, images?: string[]): string[] {
  const cover = image?.trim() ?? '';
  const rest = (images ?? []).map((src) => src.trim()).filter(Boolean);
  const ordered = cover ? [cover, ...rest.filter((src) => src !== cover)] : rest;
  return [...new Set(ordered)];
}

export function coverOf(image?: string, images?: string[]): string {
  return normalizeGallery(image, images)[0] ?? '';
}
