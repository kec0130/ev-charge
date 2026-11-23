import { supabase } from './supabase';

const PAGE_SIZE = 500;

async function readUsedCarRows<Row extends { id: number }>(
  readPage: (afterId: number | undefined) => PromiseLike<{ data: Row[] | null; error: unknown }>,
) {
  const rows: Row[] = [];
  let afterId: number | undefined;

  while (true) {
    const { data, error } = await readPage(afterId);
    if (error || !data) throw new Error('중고차 가격 기록을 불러오지 못했습니다.');
    rows.push(...data);
    if (data.length < PAGE_SIZE) return rows;
    afterId = data[data.length - 1].id;
  }
}

export async function getUsedCarMonths() {
  const rows = await readUsedCarRows((afterId) => {
    const query = supabase.from('used_car').select('id,created_at').order('id').limit(PAGE_SIZE);
    return afterId === undefined ? query : query.gt('id', afterId);
  });
  return Array.from(new Set(rows.map((row) => row.created_at.slice(0, 7)))).sort().reverse();
}

export function getUsedCarsByMonth({ start, end }: { start: string; end: string }) {
  return readUsedCarRows((afterId) => {
    const query = supabase
      .from('used_car')
      .select('id,created_at,name,min_price,max_price,image')
      .gte('created_at', start)
      .lt('created_at', end)
      .order('id')
      .limit(PAGE_SIZE);
    return afterId === undefined ? query : query.gt('id', afterId);
  });
}
