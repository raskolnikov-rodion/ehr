export interface MockRequest {
  url: string;
  method: string;
  body: unknown;
  headers: Record<string, string>;
}

interface MockResponse {
  status: number;
  body: unknown;
}

export type MockHandlerFn = (req: MockRequest) => MockResponse;

export interface RouteRegistration {
  method: string;
  pattern: string | RegExp;
  handler: MockHandlerFn;
}
