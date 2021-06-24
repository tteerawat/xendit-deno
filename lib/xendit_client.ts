export class XenditClient {
  apiKey: string;
  baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://api.xendit.co") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  fetch(
    method: string,
    endpoint: string,
    bodyObject?: Record<string, unknown>,
  ): Promise<Response> {
    const url = this.baseUrl + endpoint;

    const headers = new Headers({
      "Authorization": "Basic " + btoa(this.apiKey + ":"),
      "Content-Type": "application/json",
    });

    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(bodyObject),
    });
  }
}
