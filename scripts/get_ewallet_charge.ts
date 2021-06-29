import { getAPIKey, getUserInput } from "./helpers.ts";
import { XenditClient } from "../lib/xendit_client.ts";

const apiKey = getAPIKey();
const chargeID = getUserInput("charge id:");

const client = new XenditClient(apiKey);
const json = await client.getEWalletCharge(chargeID);

console.log(json);
