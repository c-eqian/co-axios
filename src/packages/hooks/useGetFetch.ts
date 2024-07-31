import { getInstance } from '../hooks/useInstance';
import { type IRequestConfig, MethodReturn } from '../types';

export const useGetFetch = <T = any>(config: IRequestConfig): MethodReturn<T> => {
  const instance = getInstance();
  const { $http } = instance;
  return $http.get<T>(config);
};
