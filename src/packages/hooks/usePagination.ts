import type { IRequestConfig, UsePaginationOptions } from '../types';
import { useTableList } from '@eqian/utils-vue';
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
export const usePagination = <T = any, P extends object = any>(
  config: IRequestConfig<P>,
  options?: UsePaginationOptions<P>
) => {
  const [requestBody, method] = getRequestBody(config);
  const instance = getInstance();
  const { $http } = instance;
  const { abort, request: send } = $http[method]<T>(config);
  const {
    watcher = [],
    handleParams,
    pageNumKey = 'pageNum',
    pageSizeKey = 'pageSize',
    totalKey = 'total',
    listKey = 'list',
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
      responseHandler
    }
  });
  return {
    params,
    tableLoading,
    tableData,
    tableTotal,
    abort,
    handleCurrentChange,
    handleSizeChange,
    handleSearch,
    handleReset
  };
};
