export function getDefaultFrequency(lifePath: number): string {
  const map: Record<number, string> = {
    1: "111",
    2: "222",
    3: "333",
    4: "444",
    5: "555",
    6: "666",
    7: "777",
    8: "888",
    9: "999",
    11: "1111",
    22: "2222",
    33: "3333",
  };
  return map[lifePath] || "111";
}
