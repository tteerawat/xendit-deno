export function xenditClient(
  apiKey: string,
  baseUrl = "https://api.xendit.co",
) {
  async function fetchJSON(
    method: string,
    endpoint: string,
    bodyObject?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const url = baseUrl + endpoint;

    const headers = new Headers({
      "Authorization": "Basic " + btoa(apiKey + ":"),
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(bodyObject),
    });

    return response.json();
  }

  return {
    getEWalletCharge: function (
      chargeID: string,
    ) {
      return fetchJSON(
        "GET",
        `/ewallets/charges/${chargeID}`,
      );
    },

    simulateVAPayment: function (
      bankCode: string,
      bankAccountNumber: string,
      transferAmount: string | number,
    ) {
      return fetchJSON(
        "POST",
        "/pool_virtual_accounts/simulate_payment",
        {
          "bank_code": bankCode,
          "bank_account_number": bankAccountNumber,
          "transfer_amount": transferAmount,
        },
      );
    },

    getDisbursementByExternalID: function (externalID: string) {
      return fetchJSON(
        "GET",
        `/disbursements?external_id=${externalID}`,
      );
    },
  };
}
