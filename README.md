## 安装

```typescript
npm install @eqian/axios-vue @eqian/utils-vue 
```

## 使用

1. 支持以vue插件形式使用
2. 自定义

### 插件形式

如果是以插件形式使用，内置四个基本的请求方法,每个请求方法均会返回一个对象`MethodReturn`

1.  `useGetFetch`
2. `useDeleteFetch`
3. `UsePostFetch`
4. `usePutFetch`

```typescript
import installAxios from '@eqian/axios-vue'
createApp(App)
    .use(installAxios, {
        baseURL: 'http://xxxx/' // 默认配置地址
    })
    .mount('#app')

```

示例：

```typescript
import { useGetFetch } from '@eqian/axios-vue'
import {watchEffect} from "vue";
const { data, request, onSuccess, onError }= useGetFetch({
    url:'/article/list'
})
onSuccess((res)=> {
    console.log('请求成功', res)
})
onError((error)=> {
    console.log('请求失败', error)
})
watchEffect(()=> {
    console.log('请求数据', data.value)
})
// 执行请求
request()
```

立即执行：传入参数`immediate`为`true`立即执行请求数据

```typescript
import { useGetFetch } from '@eqian/axios-vue'
import {watchEffect} from "vue";
const { data, request, onSuccess, onError }= useGetFetch({
    url:'/article/list'
}, {
    immediate: true,
})
onSuccess((res)=> {
    console.log('请求成功', res)
})
onError((error)=> {
    console.log('请求失败', error)
})
watchEffect(()=> {
    console.log('请求数据', data.value)
})
```



### 自定义实例

```typescript
// request.ts
import { installHttp } from '@eqian/axios-vue'
const http = installHttp({
    baseURL: 'http://xxxx',
})
export const getArticles =  ()=>{
    const {request} = http.get({
        url: '/article/list'
    })
    return request()
}
// xxx.vue
getArticles().then(res=> {
    console.log(res)
})
```

### 请求拦截

```typescript
import { installHttp } from '@eqian/axios-vue'
const http = installHttp({
    baseURL: 'http://xxx',
    // 请求拦截器
    preRequest:(config)=> {
        //     添加时间戳
        config.params['t'] = new Date().getTime();
        return config
    }
})

```

### 响应拦截

```typescript
const http = installHttp({
    baseURL: 'http://xxx',
    /**
     * 响应拦截
     * @param response
     */
    preResponse: (response)=> {
        console.log(response)
        // 只返回数据层
        return response.data.data
    }
})
```

### `usePagination `分页请求

`usePagination(config:IRequestConfig, [,options:UsePaginationOptions])`

默认请求方法为`GET`，如果是post,则需要通过`config.method`配置

**返回值**

| 方法/属性             | 类型       | 说明                                      |
| --------------------- | ---------- | ----------------------------------------- |
| `params`              | `object`   | 参数对象                                  |
| `tableData`           | array      | 数据列表                                  |
| `tableTotal`          | `number`   | 数据总数                                  |
| `tableLoading`        | `boolean`  | 加载中                                    |
| `isLastPage`          | `boolean`  | 是否是最后一页数据                        |
| `handleSearch`        | `function` | 执行查询方法                              |
| `handleReset`         | `function` | 重置方法,`append`追加模式下，数据也会重置 |
| `handleSizeChange`    | `function` | 页数改变                                  |
| `handleCurrentChange` | `function` | 页码改变                                  |

## 通过 `CDN` 使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta lang="zh" charset="UTF-8">
  <title>Title</title>
</head>
<div id="app">{{data.data.total}}</div>
<script src="https://cdn.jsdelivr.net/npm/vue@3.4.37/dist/vue.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-demi@0.14.10/lib/index.iife.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@1.7.3/dist/axios.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@eqian/utils-vue@3.0.0/index.umd.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@eqian/axios-vue@1.0.0/index.umd.js"></script>
<script>
    /**
     * 使用自定义请求
     */
    const http = window['EqianAxiosVue']['installHttp']({
        baseURL: 'http://xxxxxx',
    })
    const { request } = http.get({
        url: '/article/list',
    })
    console.log(request().then(function (res){
        console.log(res)
    }))

    /**
     * 结合vue插件实例使用
     */
    const { createApp, watchEffect } = Vue
    const { useGetFetch } = window['EqianAxiosVue']
    createApp({
        setup(){
            const { data, request:_request } = useGetFetch({
                url: '/article/list',
            })
            _request()
            watchEffect(()=>{
                console.log(data.value);
            })
            return {data}
        }
    }).use(window['EqianAxiosVue'].default, {
        baseURL: 'http://xxxxxx',
    }).mount('#app')
</script>
</html>

```



## 配置

### `IRequestConfig`

```typescript
/**
 * 请求参数配置
 */
export interface IRequestConfig extends AxiosRequestConfig {
    /**
     * 是否携带时间戳,默认参数名：_t
     * 如果是字符串将作为参数名称
     * @default true
     */
    withTimestamp?: boolean;
    /**
     * 是否需要过滤空值参数
     * 可以根据自定义空值过滤，传入一个数组，如：[null, '']
     * @default true
     */
    isFilterEmpty?: boolean | Array<any>;
    /**
     * 请求头
     */
    header?: Record<string, any>;
    /**
     * 响应字段配置
     */
    responseFields?: {
        /**
         * 数据字段
         * @default data
         */
        data?: string;
        /**
         * 响应信息字段
         * @default msg
         */
        msg?: string;
        /**
         * 状态码字段
         * @default code
         */
        code?: string;
        [k: string]: any;
    };
    /**
     * 请求前
     * @param config
     */
    preRequest?: (config: IRequestConfig) => IRequestConfig;
    /**
     * 请求后
     * @param response
     */
    preResponse?: (response: IResponse) => MaybeRecord<IResponse> | void;
    /**
     * 请求错误处理
     * @param err
     */
    errorHandler?: (err: AxiosError) => void;
}
```

### `MethodReturn`

```typescript
/**
 * use[xxx],提供插件实例的方法
 * 方法类型
 */
export type MethodReturn<T = any, P = any> = {
    /**
     * 终止请求函数
     */
    abort: () => void;
    /**
     * 返回数据
     */
    data: Ref<T>;
    /**
     * 请求状态
     */
    loading: Ref<boolean>;
    /**
     * 成功回调
     * @param data
     */
    onSuccess: (callback: OnSuccessCallback<T>) => void;
    /**
     * 执行完成，成功与否都会执行
     */
    onCompleted: (callback: OnCompletedCallback) => void;
    /**
     * 错误回调
     * @param err
     */
    onError: (callback: OnErrorCallback) => void;
    /**
     * 请求方式
     * 支持传入参数
     * 如果是get、delete将会覆盖params, 如果是post、put将会覆盖data
     * @param parameter
     */
    request: (parameter?: P) => Promise<void>;
};
```

### `RequestReturn`

```typescript
export type RequestReturn<T = any, P = any> = {
    /**
     * 终止请求函数
     */
    abort: () => void;
    /**
     * 请求方式
     * 支持传入参数
     * 如果是get、delete将会覆盖params, 如果是post、put将会覆盖data
     * @param parameter
     */
    request: (parameter?: P) => Promise<T>;
};
```

### `UsePagination`

```typescript
/**
 * 参数观察
 */
export type UsePagination<P = any, D = any> = {
  /**
   * 分页键
   * @default pageNum
   */
  pageNumKey?: string;
  /**
   * 分页键
   * @default pageSize
   */
  pageSizeKey?: string;
  /**
   * 接口请求前处理
   */
  handleParams?: (params: P) => P;
  /**
   * 观察
   * 默认监听pageNumKey，pageSizeKe变化触发请求
   * 如果传入空数组，不监听
   */
  watcher?: Watcher<P>;
  /**
   * 返回结果的数据列表键
   * @default list
   * @example
   * 响应数据为 { data: { list: [] } } 则传递 data.list;
   */
  listKey?: string;
  /**
   * 返回结果的数据列表键
   * @default total
   * 响应数据为 { data: { list: [], total: 0 } } 则传递 data.total;
   */
  totalKey?: string;
  /**
   * 处理是还有数据
   * @param res
   */
  hasPage?: (res: D) => boolean;
  /**
   * 是否追加，主要用于滚动分页
   */
  append?: boolean;
  /**
   * 自定义响应时处理，返回值必须包含listKey，totalKey，如果为空，应返回对应的默认值，即list、total
   * @param res
   */
  responseHandler?: (res: D) => any;
};
```

### `UsePaginationOptions`

```typescript
export type UsePaginationOptions<P = any, D = any> = ParameterWatcher<P, D> & Options;
```

### `Watcher`

```typescript
export type Watcher<P> = {
    keys?: (keyof P)[];
    /**
     * watch 是否立即执行属性
     * @default false
     */
    immediate?: boolean;
    /**
     * watch 深度监听属性
     * @default false
     */
    deep?: boolean;
};
```

### `Options`

```typescript
export type Options = {
    /**
     * 是否立即执行
     * @default false
     */
    immediate?: boolean;
    /**
     * 方法实例KEY
     * 如果不传，默认生成
     */
    key?: string;
};
```

### 其他

```typescript
/**
 * 成功回调方法类型
 */
export type OnSuccessCallback<T = any> = (callback: AxiosResponse<T>) => void;
/**
 * 完成回调方法类型
 */
export type OnCompletedCallback = () => void;
/**
 * 失败回调方法类型
 */
export type OnErrorCallback<T = any> = (callback: AxiosError<T>) => void;
// 请求响应参数，包含data
export interface IResponse extends AxiosResponse {
    $config: IRequestConfig;
}
```

