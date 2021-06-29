import { getAPIKey, getUserInput } from "./helpers.ts";
import { XenditClient } from "../lib/xendit_client.ts";

const apiKey: string = getAPIKey();
const bankCode: string = getUserInput("bank code:");
const bankAccountNumber: string = getUserInput("bank account number:");
const transferAmount: string = getUserInput("transfer amount:");

const client = new XenditClient(apiKey);
const json = await client.simulateVAPayment(
  bankCode,
  bankAccountNumber,
  transferAmount,
);

console.log(json);
