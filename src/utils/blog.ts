export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const BLOG_CATEGORIES = [
  '전체',
  '충전 생활',
  '구매 가이드',
  '유지비',
  '자동차 소식',
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export function getPostCategory(post: { slug: string; title: string }): BlogCategory {
  if (['ev-charge-introduction', 'home-ev-charger', 'ev-chargers-delivery'].includes(post.slug))
    return '충전 생활';
  if (post.slug === 'green-car-acquisition-tax') return '유지비';
  if (['electric-car-subsidy', 'genesis-gv70', 'bmw-ix50'].includes(post.slug))
    return '구매 가이드';
  return '자동차 소식';
}
export function formatPostDate(date: string) {
  return date.slice(0, 10).replace(/-/g, '.');
}
