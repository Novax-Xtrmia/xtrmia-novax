export function getZodiacSign(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const signs: [string, number][] = [
    ["Capricorne", 20],
    ["Verseau", 19],
    ["Poissons", 20],
    ["Bélier", 20],
    ["Taureau", 21],
    ["Gémeaux", 21],
    ["Cancer", 22],
    ["Lion", 22],
    ["Vierge", 22],
    ["Balance", 23],
    ["Scorpion", 23],
    ["Sagittaire", 21],
    ["Capricorne", 31],
  ];

  const threshold = signs[month - 1][1];
  return day <= threshold ? signs[month - 1][0] : signs[month][0];
}
