export interface ApiResponse<T = undefined> {
  data: T;
  statusCode: number;
}

export type ApiResponsePromise<T = undefined> = Promise<ApiResponse<T>>;


export interface SearchResponse<T> {
  total: number;
  data: T;
}
