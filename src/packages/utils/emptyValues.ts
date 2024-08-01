import { isObject, isString } from '@eqian/utils-vue';
const falseValues = [undefined, null, NaN, '', false, 0, [], {}];
/**
 * 过滤空值
 * @param obj
 * @param filters
 */
export const removeEmptyValues = <T extends object>(
  obj: T,
  filters: unknown[] = falseValues
): Partial<T> => {
  if (!isObject(obj)) return obj;
  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    if (!filters.includes(value)) {
      if (Array.isArray(value)) {
        // 如果是数组，递归处理数组中的每个元素
        const filteredArray = value.filter(item => !filters.includes(item));
        if (filteredArray.length > 0) {
          result[key] = filteredArray.map(item =>
            typeof isObject(item) ? removeEmptyValues(item) : item
          );
        }
      } else if (isObject(value)) {
        // 如果是对象，递归处理对象的属性
        const filteredObj = removeEmptyValues(value);
        if (Object.keys(filteredObj).length > 0) {
          result[key] = filteredObj;
        }
      } else if (filters.includes(value)) {
        // 如果是其他非空值，则保留
        result[key] = isString(value) ? value.trim() : value;
      }
    }
    return result;
  }, {} as Partial<T>);
};
