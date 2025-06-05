export function getElementFromLifePath(lifePath: number): string {
  if ([1, 5, 9].includes(lifePath)) return "Feu";
  if ([2, 4, 8].includes(lifePath)) return "Terre";
  if ([3, 6].includes(lifePath)) return "Air";
  if ([7, 11, 22, 33].includes(lifePath)) return "Eau";
  return "Éther";
}
