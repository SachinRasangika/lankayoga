/** Prefix a public file path with the Vite base URL (needed on GitHub Pages). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
