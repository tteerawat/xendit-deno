import { getAPIKey, getUserInput } from "./helpers.ts";
import { XenditClient } from "../lib/xendit_client.ts";
import { brightBlue, green, red } from "../deps.ts";

// inputs
const apiKey: string = getAPIKey();
const bankCode: string = getUserInput("bank code:");
const bankAccountNumber: string = getUserInput("bank account number:");
const transferAmount: string = getUserInput("transfer amount:");

// process
try {
  console.log(brightBlue("Simulating VA payment..."));

  const client = new XenditClient(apiKey);
  const response = await client.fetch(
    "POST",
    "/pool_virtual_accounts/simulate_payment",
    {
      "bank_code": bankCode,
      "bank_account_number": bankAccountNumber,
      "transfer_amount": transferAmount,
    },
  );
  const jsonData = await response.json();

  if (response.ok) {
    console.log(green(jsonData.message));
  } else {
    console.log(red(`${jsonData.error_code} - ${jsonData.message}`));
  }
} catch (error) {
  console.error(red("error:"), error);
}
