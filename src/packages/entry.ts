import RequestHttp from './interceptor';
import type { IRequestConfig } from './types';
export * from './types';
export { useGetFetch } from './hooks/useGetFetch';
export { useDeleteFetch } from './hooks/useDeleteFetch';
export { usePostFetch } from './hooks/usePostFetch';
export { usePutFetch } from './hooks/usePutFetch';

export const installHttp = (options?: IRequestConfig) => new RequestHttp(options);
