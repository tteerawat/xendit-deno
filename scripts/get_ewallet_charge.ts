import { getAPIKey, getUserInput } from "./helpers.ts";
import { xenditClient } from "../lib/xendit_client.ts";

const apiKey = getAPIKey();
const chargeID = getUserInput("charge id:");

const client = xenditClient(apiKey);
const json = await client.getEWalletCharge(chargeID);

console.log(json);
