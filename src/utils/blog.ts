export function convertToSlug(text: string) {
  const nonLatinPattern =
    /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7A3\w\s-]/g;

  return text
    .toLowerCase()
    .replace(nonLatinPattern, '') // Remove non-Latin and non-space characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .trim(); // Trim any leading or trailing spaces or hyphens
}
