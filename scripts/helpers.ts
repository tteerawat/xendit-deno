export function getUserInput(message: string): string {
  const input = prompt(message) || "";
  return input.trim();
}
