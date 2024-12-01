const DAY = "02";
const EXAMPLE = `\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;
const PART_1_EXAMPLE = 2;
const PART_2_EXAMPLE = 4;
const PART_1_SOLUTION = 624;
const PART_2_SOLUTION = 658;

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  private difference(numbs: number[]): number[] {
    const diffs: number[] = [];
    for (let i = 1; i < numbs.length; i++) {
      diffs.push(numbs[i - 1] - numbs[i]);
    }
    return diffs;
  }

  part1(input: string = this.input()): number {
    let sum = 0;

    const levels = toLines(input).map((l) =>
      l.split(" ").map((v) => parseInt(v.trim()))
    );

    const isValid = (diffs: number[]): boolean => {
      const signs: Record<number, number> = {};
      for (const diff of diffs) {
        const abs = Math.abs(diff);
        if (abs > 3 || abs < 1) return false;
        signs[Math.sign(diff)] = (signs[Math.sign(diff)] ?? 0) + 1;
      }

      return Object.keys(signs).length === 1;
    };

    for (const level of levels) {
      const diffs = this.difference(level);
      if (isValid(diffs)) sum++;
    }

    return sum;
  }

  part2(input: string = this.input()): number {
    let sum = 0;

    const levels = toLines(input).map((l) =>
      l.split(" ").map((v) => parseInt(v.trim()))
    );

    const isValid = (diffs: number[]): boolean => {
      const signs = new Set(diffs.map(Math.sign).filter((s) => s !== 0));
      return signs.size === 1 &&
        diffs.every((d) => Math.abs(d) >= 1 && Math.abs(d) <= 3);
    };

    for (const level of levels) {
      const originalDiffs = this.difference(level);
      if (isValid(originalDiffs)) {
        sum++;
        continue;
      }

      let isSafe = false;
      for (let i = 0; i < level.length; i++) {
        const modifiedLevel = [...level.slice(0, i), ...level.slice(i + 1)];
        const modifiedDiffs = this.difference(modifiedLevel);

        if (isValid(modifiedDiffs)) {
          isSafe = true;
          break;
        }
      }

      if (isSafe) {
        sum++;
      }
    }

    return sum;
  }
}

if (import.meta.main) {
  const solution = new Solution(DAY);
  console.log("Part 1: ", solution.part1());
  console.log("Part 2: ", solution.part2());
}

// ===TESTING===
import { assertEquals } from "@std/assert";
import { readToString, toLines } from "../lib/utils.ts";

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
