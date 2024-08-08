import { useBaseFetch } from './useBaseFetch';
import type { IRequestConfig, Options } from '../types';

export const useDeleteFetch = <T = any, P = any>(config: IRequestConfig, options?: Options) => {
  return useBaseFetch<T, P>('delete', config, options);
};
