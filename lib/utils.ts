export function readToString(path: string): string {
  return new TextDecoder().decode(Deno.readFileSync(path));
}

export function toLines(text: string): string[] {
  return text.replace("\r", "").split("\n").filter(Boolean);
}
