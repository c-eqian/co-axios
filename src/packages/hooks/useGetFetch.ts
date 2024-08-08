import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, MethodReturn, Options } from '../types';

export const useGetFetch = <T = any>(
  config: IRequestConfig,
  options?: Options
): MethodReturn<T> => {
  return useBaseFetch('get', config, options);
};
