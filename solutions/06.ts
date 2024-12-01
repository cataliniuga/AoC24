const DAY = "06";
const EXAMPLE = `\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
const PART_1_EXAMPLE = 41;
const PART_2_EXAMPLE = 6;
const PART_1_SOLUTION = 5409;
const PART_2_SOLUTION = 0; // >1.4

class Solution {
  constructor(private day: string) {}
  private input(): string {
    return readToString(`input/${this.day}.txt`);
  }

  part1(input: string = this.input()): number {
    const m = toLines(input).map((l) => l.split(""));
    enum Direction {
      Up,
      Down,
      Left,
      Right,
    }
    let dir = Direction.Up;
    let x = m.findIndex((l) => l.includes("^"));
    let y = m[x].findIndex((s) => s === "^");

    const isOut = (x: number, y: number) => {
      if (x < 0 || x >= m.length) return true;
      if (y < 0 || y >= m[0].length) return true;
      return false;
    };
    const isBlocked = (x: number, y: number) => m[x][y] === "#";
    const rotate = () => {
      switch (dir) {
        case Direction.Up:
          dir = Direction.Right;
          break;
        case Direction.Right:
          dir = Direction.Down;
          break;
        case Direction.Down:
          dir = Direction.Left;
          break;
        case Direction.Left:
          dir = Direction.Up;
          break;
      }
    };
    const move = (): boolean => {
      let tempX: number = x;
      let tempY: number = y;
      switch (dir) {
        case Direction.Up:
          tempX = x - 1;
          break;
        case Direction.Right:
          tempY = y + 1;
          break;
        case Direction.Down:
          tempX = x + 1;
          break;
        case Direction.Left:
          tempY = y - 1;
          break;
      }

      m[x][y] = "X";
      if (isOut(tempX, tempY)) return false;
      if (isBlocked(tempX, tempY)) {
        rotate();
        return true;
      }
      x = tempX, y = tempY;
      return true;
    };

    while (true) {
      // console.log(m.map((l) => l.join("")).join("\n"));
      const ok = move();
      if (!ok) break;
      // console.clear();
    }

    return m.map((l) => l.join("")).join("\n")
      .matchAll(/X/gm).toArray().length;
  }

  part2(input: string = this.input()): number {
    const m = toLines(input).map((l) => l.split(""));
    let counter = 0;

    enum Direction {
      Up,
      Down,
      Left,
      Right,
    }
    let dir = Direction.Up;
    let x = m.findIndex((l) => l.includes("^"));
    let y = m[x].findIndex((s) => s === "^");

    const isOut = (x: number, y: number) => {
      if (x < 0 || x >= m.length) return true;
      if (y < 0 || y >= m[0].length) return true;
      return false;
    };
    const isBlocked = (x: number, y: number) => m[x][y] === "#";
    const isLoop = (x: number, y: number, dir: Direction) => {
      let line: string[];
      let ok = false;
      switch (dir) {
        case Direction.Up:
          line = m.slice(0, x).map((l) => l[y]);
          ok = line.join("").includes("+");
          break;
        case Direction.Right:
          line = m[x].slice(y);
          ok = line.join("").includes("+");
          break;
        case Direction.Down:
          line = m.slice(x).map((l) => l[y]);
          ok = line.join("").includes("+");
          break;
        case Direction.Left:
          line = m[x].slice(0, y);
          ok = line.join("").includes("+");
          break;
      }
      return ok;
    };
    const change = (dir: Direction): Direction => {
      switch (dir) {
        case Direction.Up:
          return Direction.Right;
        case Direction.Right:
          return Direction.Down;
        case Direction.Down:
          return Direction.Left;
        case Direction.Left:
          return Direction.Up;
      }
    };
    const next = (x: number, y: number) => {
      let tempX: number = x;
      let tempY: number = y;
      switch (dir) {
        case Direction.Up:
          tempX = x - 1;
          break;
        case Direction.Right:
          tempY = y + 1;
          break;
        case Direction.Down:
          tempX = x + 1;
          break;
        case Direction.Left:
          tempY = y - 1;
          break;
      }
      return [tempX, tempY];
    };
    const move = (): boolean => {
      const [tempX, tempY] = next(x, y);

      if (m[x][y] !== "+") m[x][y] = "X";
      if (isOut(tempX, tempY)) return false;
      if (isBlocked(tempX, tempY)) {
        m[x][y] = "+";
        dir = change(dir);
        return true;
      }
      x = tempX, y = tempY;
      if (isLoop(x, y, change(dir))) {
        counter++;
      }

      return true;
    };

    while (true) {
      const ok = move();
      if (!ok) break;
    }
    console.log(m.map((l) => l.join("")).join("\n"));

    return counter;
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
