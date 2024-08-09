import { IRequestConfig, UsePaginationOptions, UsePaginationReturn } from '../types';
import { useTableList } from './useTableList';
import { getInstance } from './useInstance';
import { unref } from 'vue-demi';
const getRequestBody = (config: IRequestConfig) => {
  const { method = 'get' } = config;
  if (method.toLowerCase() === 'get') {
    return [unref(config.params), method];
  }
  if (method.toLowerCase() === 'post') {
    return [unref(config.data), method];
  }
  return [{}, method];
};
/**
 * 分页请求
 * @param config
 * @param options
 */
export const usePagination = <T = any, P extends object = any, D = any>(
  config: IRequestConfig<P>,
  options?: UsePaginationOptions<P, D>
): UsePaginationReturn<T, P> => {
  const [requestBody, method] = getRequestBody(config);
  const instance = getInstance();
  const { $http } = instance;
  const { abort, request: send } = $http[method]<T>(config);
  const {
    watcher,
    handleParams,
    pageNumKey = 'pageNum',
    pageSizeKey = 'pageSize',
    totalKey = 'total',
    listKey = 'list',
    append,
    hasPage,
    responseHandler
  } = options ?? ({} as UsePaginationOptions<P>);
  const {
    params,
    tableLoading,
    tableData,
    tableTotal,
    handleSearch,
    handleCurrentChange,
    handleSizeChange,
    isLastPage,
    handleReset
  } = useTableList<T, P>({
    request: {
      api: send,
      pageSizeKey,
      params: requestBody,
      pageNumKey,
      handleParams,
      watcher
    },
    response: {
      totalKey,
      listKey,
      append,
      hasPage,
      responseHandler
    }
  });
  return {
    params,
    tableLoading,
    tableData,
    tableTotal,
    abort,
    isLastPage,
    handleCurrentChange,
    handleSizeChange,
    handleSearch,
    handleReset
  };
};
