const DAY = "03";
const EXAMPLE =
  `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const PART_1_EXAMPLE = 161;
const PART_2_EXAMPLE = 48;
const PART_1_SOLUTION = 178538786;
const PART_2_SOLUTION = 102467299;

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  part1(input: string = this.input()): number {
    const result = input.matchAll(/mul\(\d+,\d+\)/gm).map((m) => {
      return m[0].replace("mul", "").replace(",", "*");
    });

    return eval(Array.from(result).join("+"));
  }

  part2(input: string = this.input()): number {
    const iter = input.matchAll(/don't\(\)|do\(\)|mul\(\d+,\d+\)/gm).map((m) =>
      m[0]
    );
    let toggle = true;
    const result = Array.from(iter).map((match) => {
      if (match === "do()") {
        toggle = true;
        return "0";
      }
      if (match === "don't()") {
        toggle = false;
        return "0";
      }

      if (toggle === false) {
        return "0";
      }

      return match.replace("mul", "").replace(",", "*");
    }).join("+");

    return eval(result);
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
