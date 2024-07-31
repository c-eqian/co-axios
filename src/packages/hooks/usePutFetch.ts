import { getInstance } from '../hooks/useInstance';
import { type IRequestConfig, MethodReturn } from '../types';

export const usePutFetch = <T = any>(config: IRequestConfig): MethodReturn<T> => {
  const instance = getInstance();
  const { $http } = instance;
  return $http.put<T>(config);
};
