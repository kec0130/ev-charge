export const getUsedCarMonthRange = (month: string) => {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return null;

  const [year, monthNumber] = month.split('-').map(Number);
  if (year === 0) return null;

  const nextYear = monthNumber === 12 ? year + 1 : year;
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;
  return {
    start: `${month}-01`,
    end: `${String(nextYear).padStart(4, '0')}-${String(nextMonth).padStart(2, '0')}-01`,
  };
};
