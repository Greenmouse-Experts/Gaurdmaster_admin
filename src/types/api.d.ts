export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: string;
}

export interface ApiResponseV2<T = any> {
  data: T;
  meta?: Record<string, any>;
  count: number;
}

// Keep these for backward compatibility if any
export type APIRESPONSE<T = any> = ApiResponse<T>;
export type APIRESPONSEV2<T = any> = ApiResponseV2<T>;
