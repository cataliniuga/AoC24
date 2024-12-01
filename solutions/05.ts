const DAY = "05";
const EXAMPLE = `\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;
const PART_1_EXAMPLE = 143;
const PART_2_EXAMPLE = 123;
const PART_1_SOLUTION = 6384;
const PART_2_SOLUTION = 5353;

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  part1(input: string = this.input()): number {
    const [rules, updates] = input.split("\n\n")
      .map((s) => s.split("\n").filter(Boolean));
    const ruleMap: Map<number, number[]> = new Map();
    rules.map((rule) => rule.split("|").map((v) => parseInt(v))).map((pair) => {
      ruleMap.set(pair[0], [...ruleMap.get(pair[0]) ?? [], pair[1]]);
    });

    const updatesList = updates.map((u) =>
      u.split(",").map((v) => parseInt(v))
    );
    const validUpdates = updatesList.filter((update) => {
      for (const [before, afterArr] of ruleMap) {
        const ruleIndex = update.indexOf(before);
        if (ruleIndex === -1) continue;
        const beforeArr = update.slice(0, ruleIndex);
        const check = afterArr.every((after) => !beforeArr.includes(after));
        if (!check) return false;
      }
      return true;
    });
    return validUpdates.reduce(
      (sum, arr) => sum + arr.at(Math.floor(arr.length / 2))!,
      0,
    );
  }

  part2(input: string = this.input()): number {
    const [rules, updates] = input.split("\n\n")
      .map((s) => s.split("\n").filter(Boolean));
    const ruleMap: Map<number, number[]> = new Map();
    rules.map((rule) => rule.split("|").map((v) => parseInt(v))).map((pair) => {
      ruleMap.set(pair[0], [...ruleMap.get(pair[0]) ?? [], pair[1]]);
    });

    const updatesList = updates.map((u) =>
      u.split(",").map((v) => parseInt(v))
    );
    const invalidUpdates = updatesList.filter((update) => {
      for (const [before, afterArr] of ruleMap) {
        const ruleIndex = update.indexOf(before);
        if (ruleIndex === -1) continue;
        const beforeArr = update.slice(0, ruleIndex);
        const check = afterArr.some((after) => beforeArr.includes(after));
        if (check) return true;
      }
      return false;
    });
    invalidUpdates.map((update) =>
      update.sort((a, b) => {
        if (ruleMap.has(a) && ruleMap.get(a)?.includes(b)) return -1;
        if (ruleMap.has(b) && ruleMap.get(b)?.includes(a)) return 1;
        return 0;
      })
    );
    return invalidUpdates.reduce(
      (sum, arr) => sum + arr.at(Math.floor(arr.length / 2))!,
      0,
    );
  }
}

if (import.meta.main) {
  const solution = new Solution(DAY);
  console.log("Part 1: ", solution.part1());
  console.log("Part 2: ", solution.part2());
}

// ===TESTING===
import { assertEquals } from "@std/assert";
import { readToString } from "../lib/utils.ts";

Deno.test("example part 1", () => {
  const result = new Solution(DAY).part1(EXAMPLE);
  assertEquals(PART_1_EXAMPLE, result);
});

Deno.test("example part 2", () => {
  const result = new Solution(DAY).part2(EXAMPLE);
  assertEquals(PART_2_EXAMPLE, result);
});

Deno.test("part 1", () => {
  const result = new Solution(DAY).part1();
  assertEquals(PART_1_SOLUTION, result);
});

Deno.test("part 2", () => {
  const result = new Solution(DAY).part2();
  assertEquals(PART_2_SOLUTION, result);
});
