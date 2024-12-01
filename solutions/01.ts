const DAY = "01";
const EXAMPLE = `\
3   4
4   3
2   5
1   3
3   9
3   3`;
const PART_1_EXAMPLE = 11;
const PART_2_EXAMPLE = 31;
const PART_1_SOLUTION = 1834060;
const PART_2_SOLUTION = 21607792;

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  part1(input: string = this.input()): number {
    let sum = 0;
    const lines = toLines(input);
    const [left, right]: number[][] = [[], []];

    lines.map((line: string) => line.split(/\s+/).map((val) => parseInt(val)))
      .map((pair: number[]) => {
        left.push(pair[0]);
        right.push(pair[1]);
      });

    left.sort().reverse();
    right.sort().reverse();

    for (let i = 0; i < lines.length; i++) {
      if (left.length === 0 || right.length == 0) break;
      const diff = Math.abs(left.pop()! - right.pop()!);
      sum += diff;
    }

    return sum;
  }

  part2(input: string = this.input()): number {
    let sum = 0;
    const lines = toLines(input);
    const [left, right]: number[][] = [[], []];

    lines.map((line: string) => line.split(/\s+/).map((val) => parseInt(val)))
      .map((pair: number[]) => {
        left.push(pair[0]);
        right.push(pair[1]);
      });

    for (const num of left) {
      const count = right.filter((val) => val === num).length;
      sum += count * num;
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
