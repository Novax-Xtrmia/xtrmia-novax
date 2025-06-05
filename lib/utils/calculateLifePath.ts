export function calculateLifePath(date: string): number {
  const digits = date.replaceAll("-", "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  while (![11, 22, 33].includes(sum) && sum >= 10) {
    sum = sum
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  return sum;
}
