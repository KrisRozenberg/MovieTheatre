export interface Response {
  Response: boolean;
  Error?: string;
}

export interface SingleResponse<T> extends Response {
  model: T;
}

export interface JwtResponse {
  token: string;
  // refresh: string; - in perspective
}

export interface PaginatedResponse<T> extends Response {
  Search: T[];
  totalResults: number;
}
