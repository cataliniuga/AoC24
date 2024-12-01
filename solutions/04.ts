const DAY = "04";
const EXAMPLE = `\
....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`;
const EXAMPLE2 = `\
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
const PART_1_EXAMPLE = 18;
const PART_2_EXAMPLE = 9;
const PART_1_SOLUTION = 2593;
const PART_2_SOLUTION = 1950;

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  part1(input: string = this.input()): number {
    const matrix = toLines(input).map((l) => l.split(""));
    const rows = matrix.length;
    const cols = matrix[0].length;
    const minYXLine = -1 * rows + 1;

    const xLines: string[] = new Array(rows).fill("");
    const yLines: string[] = new Array(cols).fill("");
    const xyLines: string[] = new Array(rows + cols - 1).fill("");
    const yxLines: string[] = new Array(rows + cols - 1).fill("");

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        xLines[r] += matrix[r][c];
        yLines[c] += matrix[r][c];
        xyLines[c + r] += matrix[r][c];
        yxLines[c - r - minYXLine] += matrix[r][c];
      }
    }

    let count = 0;
    const regex = /(?=(XMAS|SAMX))/gm;
    for (const lines of [xLines, yLines, xyLines, yxLines]) {
      for (const line of lines) {
        const matches = line.matchAll(regex).toArray();
        count += matches.length;
      }
    }

    return count;
  }

  part2(input: string = this.input()): number {
    const matrix = toLines(input);
    const rows = matrix.length;
    const cols = matrix[0].length;
    const patterns = [
      /M.S\n.A.\nM.S/gm,
      /M.M\n.A.\nS.S/gm,
      /S.M\n.A.\nS.M/gm,
      /S.S\n.A.\nM.M/gm,
    ];

    let count = 0;
    for (let i = 0; i < rows - 2; i++) {
      for (let j = 0; j < cols - 2; j++) {
        const sub = [
          matrix[i].slice(j, j + 3),
          matrix[i + 1].slice(j, j + 3),
          matrix[i + 2].slice(j, j + 3),
        ].join("\n");
        for (const ptrn of patterns) {
          if (sub.match(ptrn)) {
            count++;
            break;
          }
        }
      }
    }
    return count;
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
  const result = new Solution(DAY).part2(EXAMPLE2);
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
