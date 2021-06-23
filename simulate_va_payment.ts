const apiKey = Deno.env.get("XENDIT_API_KEY");

if (apiKey === undefined) {
  throw new Error("XENDIT_API_KEY is missing!");
}

const bankCode = Deno.args[0];
const bankAccountNumber = Deno.args[1];
const transferAmount = Deno.args[2];

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

fetch(request)
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
