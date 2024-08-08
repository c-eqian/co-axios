import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, MethodReturn, Options } from '../types';

export const usePutFetch = <T = any>(
  config: IRequestConfig,
  options?: Options
): MethodReturn<T> => {
  return useBaseFetch('put', config, options);
};
