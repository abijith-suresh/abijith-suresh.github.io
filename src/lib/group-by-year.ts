type YearGroup<T> = {
  year: number;
  items: T[];
};

export function groupByYear<T>(items: T[], getDate: (item: T) => Date): YearGroup<T>[] {
  const groups = new Map<number, T[]>();

  for (const item of items) {
    const year = getDate(item).getFullYear();
    const group = groups.get(year);
    if (group) {
      group.push(item);
    } else {
      groups.set(year, [item]);
    }
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, items }));
}
