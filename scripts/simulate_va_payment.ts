import { getUserInput } from "./helpers.ts";
import { brightBlue, green, red } from "../deps.ts";

const apiKey: string | undefined = Deno.env.get("XENDIT_API_KEY");

if (typeof apiKey === "undefined") {
  console.error(red("XENDIT_API_KEY is missing!"));
  Deno.exit(1);
}

const bankCode: string = getUserInput("bank code:");
const bankAccountNumber: string = getUserInput("bank account number:");
const transferAmount: string = getUserInput("transfer amount:");

const headers = new Headers({
  "Authorization": "Basic " + btoa(apiKey + ":"),
  "Content-Type": "application/json",
});

const reqBody = JSON.stringify({
  bank_code: bankCode,
  bank_account_number: bankAccountNumber,
  transfer_amount: transferAmount,
});

const request = new Request(
  "https://api.xendit.co/pool_virtual_accounts/simulate_payment",
  {
    method: "POST",
    headers: headers,
    body: reqBody,
  },
);

try {
  console.log(brightBlue("Simulating VA payment..."));
  const response = await fetch(request);
  const jsonData = await response.json();
  const message: string = jsonData.message;

  if (response.ok) {
    console.log(green(message));
  } else {
    console.log(red(message));
  }
} catch (error) {
  console.error(red("error:"), error);
}
