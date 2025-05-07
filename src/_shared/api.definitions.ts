export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// export type HTTPStatus = '200' | '201' | '204' | '400' | '401' | '403' | '404' | '500';
export type HTTPStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;
export interface ApiResponseT<T = unknown> {
  status: HTTPStatus;
  message: string;
  data: T;
}