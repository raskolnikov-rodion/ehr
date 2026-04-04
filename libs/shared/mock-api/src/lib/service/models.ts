export interface MockRequest {
  url: string;
  method: string;
  body: unknown;
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
