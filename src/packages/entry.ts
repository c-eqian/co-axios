import RequestHttp from './interceptor';
import type { IRequestConfig } from './types';
export * from './types';
export { useGetFetch } from './hooks/useGetFetch';
export { useDeleteFetch } from './hooks/useDeleteFetch';
export { UsePostFetch } from './hooks/usePostFetch';
export { usePutFetch } from './hooks/usePutFetch';
export const http = new RequestHttp({
  isFilterEmpty: true
});

export const installHttp = (options?: IRequestConfig) => new RequestHttp(options);
