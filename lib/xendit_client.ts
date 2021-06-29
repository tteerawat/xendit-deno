export class XenditClient {
  public apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.xendit.co") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public async getEWalletCharge(
    chargeID: string,
  ) {
    return await this.fetchJSON(
      "GET",
      `/ewallets/charges/${chargeID}`,
    );
  }

  public async simulateVAPayment(
    bankCode: string,
    bankAccountNumber: string,
    transferAmount: string | number,
  ) {
    return await this.fetchJSON(
      "POST",
      "/pool_virtual_accounts/simulate_payment",
      {
        "bank_code": bankCode,
        "bank_account_number": bankAccountNumber,
        "transfer_amount": transferAmount,
      },
    );
  }

  private async fetchJSON(
    method: string,
    endpoint: string,
    bodyObject?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const url = this.baseUrl + endpoint;

    const headers = new Headers({
      "Authorization": "Basic " + btoa(this.apiKey + ":"),
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(bodyObject),
    });
    const json = await response.json();
    return json;
  }
}
