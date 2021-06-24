import { red } from "../deps.ts";

function getAPIKey(): string {
  const apiKey: string | undefined = Deno.env.get("XENDIT_API_KEY");

  if (apiKey === undefined) {
    console.error(red("XENDIT_API_KEY is missing!"));
    Deno.exit(1);
  }

  return apiKey;
}

function getUserInput(message: string): string {
  const input = prompt(message) || "";
  return input.trim();
}

export { getAPIKey, getUserInput };
