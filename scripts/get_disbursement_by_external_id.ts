import { getAPIKey, getUserInput } from "./helpers.ts";
import { xenditClient } from "../lib/xendit_client.ts";

const apiKey = getAPIKey();
const externalID = getUserInput("external id:");

const client = xenditClient(apiKey);
const json = await client.getDisbursementByExternalID(externalID);

console.log(json);
