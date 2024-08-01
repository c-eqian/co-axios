## 安装

```typescript
npm install @eqian/axios-vue @eqian/utils-vue 
```

## 使用

1. 支持以vue插件形式使用
2. 自定义

### 插件形式

如果是以插件形式使用，内置四个基本的请求方法,每个请求方法均会返回一个对象`MethodReturn`

```typescript
export type MethodReturn<T = any> = {
  abort: () => void; // 终止请求
  request: () => Promise<T>; // 最终请求的方法
};
```

1. `useGetFetch`
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
const { request } = useGetFetch({
  url: '/article/list'
})
request().then(res=>{
  console.log(res)
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
export type MethodReturn<T = any> = {
  abort: () => void;
  request: () => Promise<T>;
};
```

