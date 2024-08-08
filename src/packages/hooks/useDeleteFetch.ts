import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, MethodReturn, Options } from '../types';

export const useDeleteFetch = <T = any>(
  config: IRequestConfig,
  options?: Options
): MethodReturn<T> => {
  return useBaseFetch('delete', config, options);
};
