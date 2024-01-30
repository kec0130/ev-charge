export const generateDateStrings = () => {
  const startYear = 2023;
  const startMonth = 9;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  let dates = [];
  for (let year = startYear; year <= currentYear; year++) {
    let start = year === startYear ? startMonth : 1;
    let end = year === currentYear ? currentMonth : 12;
    for (let month = start; month <= end; month++) {
      dates.push(`${year}-${month.toString().padStart(2, '0')}`);
    }
  }
  return dates;
};
