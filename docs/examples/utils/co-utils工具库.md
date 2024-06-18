# 介绍

![npm](https://img.shields.io/npm/v/co-utils-vue)![下载](https://img.shields.io/npm/dm/co-utils-vue.svg)[![Coverage Status](https://coveralls.io/repos/github/C1320/co-utils-vue/badge.svg?branch=master)](https://coveralls.io/github/C1320/co-utils-vue?branch=master)


co-utils-vue工具库是基于typescript实现的一个常用库封装

# 安装

```bash
npm install co-utils-vue -D
```

# 使用

# Hooks

## usePick

与`Pick`选类似，但是usePick取指定一组属性值，返回一个新的属性值

```typescript
const test = {
    book: '倚天屠龙记',
    name: '金庸',
    price: '18',
    likes: '999'
};
console.log(usePick(test, [])); // {}
console.log(usePick(test, ['name'])); // {name: '金庸'}
```

## useTableList

表格分页数据请求，返回的数据结果应为：

```json
{
    list | listKey: [],
    total | totalKey:0
}
```

配置参数

```typescript
UseTableList<T = any, P = any> {
  request: {
    /**
     * 请求方法
     */
    api: (params: P) => Promise<T>;
    /**
     * 请求参数
     */
    params?: P;
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
     * 返回结果的数据列表键
     * @default list
     */
    listKey?: string;
    /**
     * 返回结果的数据列表键
     * @default total
     */
    totalKey?: string;
    /**
     * 接口请求前处理
     */
    handleParams?: (params: P) => P;
  };
  // response?: {};
}
```

## useFormValueWatcher

在一些场景中，有时候需要进行表单的监听而进行某些操作，例如，修改某些信息时，如果没有发生变化，不能进行编辑或者一些其他的操作，`useFormValueWatcher`由此诞生

```javascript
// vue3 使用实例
const origin = cloneDeep(form) // 克隆原始表单数据
watch(()=>[form], ()=>{
    console.log(useFormValueWatcher(form, origin)) // 表单发生变化返回true,否则false
},{ deep: true })
```

## useSortByKey

根据某个数组值进行排序，如数据类型是`object[]`形式,可以通过`key`自定义需要的排序的键

`options`配置项

| 参数        | 类型         | 默认值 | 说明               |
| ----------- | ------------ | ------ | ------------------ |
| `order`     | `dec`        | `asc`  | `dec`              |
| `key`       | `object`的键 |        |                    |
| `compareFn` | Funtion      | -      | 提供自定义比较函数 |

## useMerge

`useMerge` 使用了递归的方式，可以深度合并多个对象，对于相同的键名，后面的对象会覆盖前面的对象。如果键对应的值是对象，则会递归合并其内部的键值对。

**示例一**

```typescript
  const source = {
    name: '张三',
    gender: '女'
  };
  const source1 = {
    name: '张三',
    info: '信息'
  };
const mergeRes = useMerge(source, source1)
/**
{
      name: '张三',
      gender: '女',
      info: '信息'
    }
**/
```

**示例二**

```typescript
  const source = {
          name: '张三',
          gender: '女',
          info: {
            name: '张强'
          }
        }
  const source1 = {
          name: '张4',
          info: {
            age: 18
          }
        }
  const mergeRes = useMerge({}, source,source1)
  /**
  {
      name: '张4',
      gender: '女',
      info: {
        name: '张强',
        age: 18
      }
    }
  **/
```

**示例三**

```typescript
useMerge<number[]>([], [1, 2], [3, 4])) //[3, 4]

useMerge(
        {},
        {
          name: '张三',
          gender: '女'
        },
        {
          name: '张三',
          gender: '女'
        },
        {
          name: '张三',
          gender: '女',
          info: [520]
        }
      )
/**
      name: '张三',
      gender: '女',
      info: [520]
**/
```

## useEmptyObject

`useEmptyObject`用于将对象值深度置空，会根据传入的对象值进行判断并赋予对应的空值。它接收两个参数`data`和`defaultValue`其中`data`是一个泛型，表示要清空的对象，`defaultValue`是一个部分类型* 它与`data`的类型一致，用于设置每个属性的初始值。在设置属性的初始值时，使用`defaultValue`对应字段的值来替换原有的属性值。最后，返回清空后的 `data `对象.

**示例一**

```typescript
  const data = {
    key: '8899797',
    nested: {
      ll: '123',
      deep: {
        nestedKey: 'nestedValue'
      }
    }
  };
useEmptyObject(data)
/**
{
    key: '',
    nested: {
      ll: '',
      deep: {
        nestedKey: ''
      }
    }
  }
**/

```

**示例二**

```typescript
  const data = {
    key: '8899797',
    nested: {
      ll: '123',
      deep: {
        nestedKey: 'nestedValue'
      }
    }
  };
useEmptyObject(data, {
        nested: {
          deep: {
            nestedKey: '8888'
          }
        }
      })
/**
{
      key: '',
      nested: {
        ll: '',
        deep: {
          nestedKey: '8888'
        }
      }
    }
**/
```

## useChunk

将数组数据进行分片,内部做了正无穷负无穷处理

```typescript
useChunk(['a', 'b', 'c', 'd'], 0) // => []
useChunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
useChunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
useChunk(['a', 'b', 'c', 'd'], 3.5) // => [['a', 'b', 'c'], ['d']]
useChunk(['a', 'b', 'c', 'd'], 1 / 0) // => [['a'], ['b'], ['c'], ['d']]
useChunk(['a', 'b', 'c', 'd'], -1 / 0) // => []
```

## useFormatDate

`useFormatDate`将时间进行格式化输出，支持时间戳、标准时间等。`date`参数为转换时间，`format`默认输出格式`yyyy-MM-dd`

-  **时间戳**

```javascript
console.log('时间戳', useFormatDate(1669290652000) ) // 2022-11-24
```

- **时间**

```javascript
console.log('时间戳', useFormatDate(new Date()) ) // 2022-11-24
```

- **指定格式**

```javascript
console.log('时间戳', useFormatDate(new Date(), 'yyyy-MM-dd HH:mm:ss') ) // 2022-11-24 19:50:52
```

## useBeforeDate

`useBeforeDate`接收一个时间参数，与当前时间比较，计算早于当前时间差，接收两个参数，`date`比较的时间（必须），此外，还可以传入`resDefault`，设置默认返回值，默认返回空值，（如果晚于当前时间的返回值）

- **早于当前时间**

```javascript
console.log(useBeforeDate('2021-11-25 19:50:52', '-')) // 1年前
console.log(useBeforeDate('2022-11-17 19:50:52', '-')) // 1周前
console.log(useBeforeDate('2022-11-25 19:50:52', '-')) // 54分钟前
```

- **晚于当前时间**

```javascript
console.log(useBeforeDate('2022-11-27 19:50:52', '-')) // -
```

## usePriceToThousand

`usePriceToThousand`金额千分位转换，参数`price`可以是数字或者字符串类型；参数`decimals`需要保留小数点 默认2；参数`separator`千分位符号 默认`,`；参数`round `为`true`时保留位数向下取整，否则向上取整，默认为`true`

```javascript
console.log(usePriceToThousand(3600)) // 3,600.00
console.log(usePriceToThousand(3600.2566)) // 3,600.25
console.log(usePriceToThousand(3600.2566,1,'-', false)) // 3-600.2
console.log(usePriceToThousand('9655544.58777',3,'-')) // 9-655-544.587
```

## useFormatBytes

`useFormatBytes`将文件字节转换成`	MB`等格式

参数`bytes`可以是`number`类型；参数`decimals需要保留小数点 默认2

## useEncryptedIdCard

`useEncryptedIdCard`身份证脱敏处理

```javascript
console.log(useEncryptedIdCard("450616199905206666")) // 450616****6666
console.log(useEncryptedIdCard("3600.2566")) // Error: 3600.2566 is invalid idCard
```

## useEncryptedPhone

`desPhone`手机号脱敏处理

```javascript
console.log(useEncryptedPhone("19994402299")) // 199****2299
console.log(useEncryptedPhone("3600.2566")) // Error: 3600.2566 is invalid phone number
```



## useCloneDeep

`useCloneDeep`实现数据拷贝，参数`source`拷贝的原数据内容

## useCamelize

`useCamelize`短杆拼接转驼峰,`test-icon => testIcon`

## useCamelizeToKebabCase

`useCamelizeToKebabCase`驼峰命名转短杆或者下划线命名，接收参数`str`命名字符串，`mark`支持传入`-`或者下划线进行拼接，默认为短杆`-`,`userName => user-name`

## useFirstLetterToUpperCase

`useFirstLetterToUpperCase`首字母转大写

## useFirstLetterToUpperCase

`useFirstLetterToUpperCase`首字母大写转小写

## useToFixedFix

`useToFixedFix`处理小数点, 参数`decimals`保留的小数点位数，默认为2小数位

```javascript
console.log(useToFixedFix("45588.28988, 3")) // 45588.289
console.log(useToFixedFix("45588.28988, 2")) // 45588.28
console.log(useToFixedFix("45588.28988, 1")) // 45588.2
console.log(useToFixedFix("45588.28988, 0")) // 45588
console.log(useToFixedFix("45588.28, 3")) // 45588.28
```

## useTransformTree

` useTransformTree `数组数据转树形结构，` useTransformTree `具有两个参数，`arrData`是必须的数组数据，`options`参数是可选项，`parent`是可选的绑定父节点字段，默认为`parent`，`key` 默认是可选的每组数据的唯一标识字段,默认值为`id`（这两个字段是可以自定义的）,`pid`字段是作为父节点时的值，默认为`null`

**`options`参数**

```javascript
{
  parent: string;
  key: string;
  pid: string | number | null;
}
```

**如果你的数据，没有像上面数据的`id`字段，此时，你需要传入`pid`参数设置成你的标识字段，同样的，如果你绑定的父节点字段不是`parent`，那么此时，你需要传入`parent`字段设置你的父节点字段**

```javascript
const arr = [{ parent: null, id: 1, name: '北京' },
{ parent: 1, id: 11, name: '朝阳' },
{ parent: 11, id: 111, name: '朝阳1号' },
{ parent: 1, id: 12, name: '海淀' },
{ parent: 12, id: 121, name: '海淀1号' },
{ parent: null, id: 2, name: '上海' },
{ parent: 2, id: 21, name: '浦东' },
{ parent: 21, id: 211, name: '浦东1号' },
{ parent: 2, id: 22, name: '虹口' },
{ parent: 22, id: 221, name: '虹口1号'}]

// 转换后
[
  {
    "parent": null,
    "id": 1,
    "name": "北京",
    "children": [
      {
        "parent": 1,
        "id": 11,
        "name": "朝阳",
        "children": [
          {
            "parent": 11,
            "id": 111,
            "name": "朝阳1号"
          }
        ]
      },
      {
        "parent": 1,
        "id": 12,
        "name": "海淀",
        "children": [
          {
            "parent": 12,
            "id": 121,
            "name": "海淀1号"
          }
        ]
      }
    ]
  },
  {
    "parent": null,
    "id": 2,
    "name": "上海",
    "children": [
      {
        "parent": 2,
        "id": 21,
        "name": "浦东",
        "children": [
          {
            "parent": 21,
            "id": 211,
            "name": "浦东1号"
          }
        ]
      },
      {
        "parent": 2,
        "id": 22,
        "name": "虹口",
        "children": [
          {
            "parent": 22,
            "id": 221,
            "name": "虹口1号"
          }
        ]
      }
    ]
  }
]
```

## useTransformList

`useTransformList`树形结构数据进行扁平化，其中在每一组数据中，应该包含`children`字段，如果不是该字段，那么此时应该传入**可选参数**`options`进行替换

```javascript
interface ITreeOptions {
  /**
   * 子节点的键 默认值【children】
   */
  children?: string;
  /**
   * 父节点ID的键 默认值【id】
   */
  pidKey?: string;
  /**
   * 设置父节点的属性值 默认值【null】
   */
  pidValue?: string | number | null;
  /**
   * 设置父节点键 默认值【parent】
   */
  parentKey?: string;
  /**
   * 是否需要设置父节点标志 默认值【true】
   */
  pidFlag?: boolean;
}
```

## useSFCWithInstall

`useSFCWithInstall`进行组件注册，接受一个组件作为参数

## useWebSocket

`useWebSocket`基于`websocket`进行封装；具备心跳检测，断线重连等功能机制。

例子，在`vue`文件中，你可以这样使用：

```typescript
const { ws, send, websocketOpen, data } = useWebSocket(
  url,
  {
    reconnectCount: 5,
    autoClose: true,
    onOpen: () => {
      console.log('链接成功');
    },
    onError: () => {
      console.log('链接失败1');
    },
    onClose: () => {
      console.log('连接关闭');
    },
    onFailed: () => {
      console.log('重连失败');
    }
  }
);
```

你应该注意的是，如果开启了心跳检测，默认的心跳信息是`ping`,并且如果能够从服务器中得到的响应信息也是`ping`,即相同于心跳信息，此时，数据将会被过滤，因此，在发送数据时，尽量避免与心跳信息的数据一致，你可以通过设置`heartMessage`来设置你的心跳数据。

**属性**

| 属性名         | 类型               | 默认值 | 说明                                                       | 可选 |
| -------------- | ------------------ | ------ | ---------------------------------------------------------- | ---- |
| url            | string             | -      | 链接的通道的地址                                           | 否   |
| protocols      | string \| string[] | -      | 通信协议,可接受`ws`或者`wss`协议                           | 是   |
| heartTime      | number             | 5000   | 心跳时间间隔,需要需要`开启isOpenHeart`属性，才可生效       | 是   |
| heartMessage   | string             | `ping` | 心跳信息,默认为`ping`，需要`开启isOpenHeart`属性，才可生效 | 是   |
| isReconnect    | boolean            | `true` | 是否自动重连，需要`开启isOpenHeart`属性，才可生效          | 是   |
| reconnectTime  | number             | 5000   | 重连时间间隔，需要`开启isOpenHeart`属性，才可生效          | 是   |
| reconnectCount | number \| fn       | -1     | 重连次数 -1 则不限制,可以是一个方法，需要返回一个boolean   | 是   |
| autoClose      | boolean            | true   | 自动关闭，关闭浏览器或者实例销毁时触发                     | 是   |
| onOpen         | fn                 |        | 连接成功地回调                                             | 是   |
| onClose        | fn                 |        | 关闭的回调                                                 | 是   |
| onMessage      | fn                 |        | 消息的回调                                                 | 是   |
| onError        | fn                 |        | 错误的回调                                                 | 是   |
| onFailed       | fn                 |        | 重连次数达到峰值失败回调                                   | 是   |

**配置项**

```typescript
export interface ISocketOptions {
  /**
   * 通信协议
   */
  protocols?: string | string[];
  /**
   * 心跳时间间隔
   * @default 5000
   */
  heartTime?: number;
  /**
   * 心跳信息
   * @default ping
   */
  heartMessage?: string;
  /**
   * 自动关闭
   */
  autoClose?: boolean;
  /**
   * 是否自动重连
   * @default true
   */
  isReconnect?: boolean;
  /**
   * 重连时间间隔
   * @default 5000
   */
  reconnectTime?: number;
  /**
   *  重连次数
   *  可以是数值或者返回一个boolean
   *  @default -1
   */
  reconnectCount?: number | (() => boolean);
  /**
   * 连接成功地回调
   * @param ws
   */
  onOpen?: (ws: WebSocket) => void;
  /**
   * 关闭的回调
   * @param ws
   * @param e
   */
  onClose?: (ws: WebSocket, e: CloseEvent) => void;
  /**
   * 消息的回调
   * @param ws
   * @param e
   */
  onMessage?: (ws: WebSocket, e: MessageEvent) => void;
  /**
   * 错误的回调
   * @param ws
   * @param e
   */
  onError?: (ws: WebSocket, e: Event) => void;
  /**
   * 重连失败回调
   */
  onFailed?: () => void;
}
export interface ISocketReturn<T> {
  data?: Ref<T | null>;
  close: WebSocket['close'];
  websocketOpen: () => void;
  send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean;
  ws: Ref<WebSocket | undefined>;
}
```



# Is

## isPhone

`isPhone`校验大陆手机号

```javascript
console.log(isPhone("19994403399")) // true
console.log(isPhone("15448896666774")) // false
```

## isIdCard

`isIdCard`接收一个字符串，判断是否是15或者18位身份证

```javascript
console.log(isIdCard('450603199906273529')) // true
console.log(isIdCard('45060319990886273529')) // false
```

## isObjectLike

返回当前是否是`object`类型

```javascript
console.log(isObjectLike({})) // true
console.log(isObjectLike([1, 2, 3])) // true
console.log(isObjectLike(Function)) // false
console.log(isObjectLike(null)) // false
```

## isNumber

用于检测值是否是`number`数值类型

```javascript
console.log(isNumber('-12.22')) // false
console.log(isNumber(-12.22)) // true
```

## isNumeric

用于检测值是否是`数字`数值类型，包含正数负数,可以说是`isNumber`的``增强版``

```javascript
console.log(isNumeric('1222')) // true
console.log(isNumeric('+1222')) // true
console.log(isNumeric('-1222')) // true
console.log(isNumeric('12.22')) // true
console.log(isNumeric('+12.22')) // true
console.log(isNumeric(+12.22)) // true
console.log(isNumeric('3.14e-10')) // true
console.log(isNumeric('abc')) // false
console.log(isNumeric('458.a')) // false
console.log(isNumeric('122e')) // false
```

## isEmpty

用于检测值是否为空

## isArray

用于检测值是否为一个数组

```typescript
isArray(null)
// false
isArray([])
// true
```

# 其他

## getTag

`getTag`获取数据的`toString`类型

```javascript
console.log(getTag("1999-12-25")) // [object String]
console.log(getTag(78888)) // [object Number]
console.log(getTag({})) //  [object Object]
console.log(getTag([])) //  [object Array]
console.log(getTag(null)) //  [object Null]
console.log(getTag(undefined)) //  [object Undefined]
console.log(getTag(Object)) //  [object Function]
```

## Omit

`Omit`剔除某些属性，然后返回一个新类型

```typescript
interface ITest {
    name: string;
    age: number;
    sex: string;
}
type TTest = Omit<ITest, 'age' | 'sex'>;
// 相当于
interface ITest1 {
    name: string;
}
```

## Pick

`Pick`选取指定一组属性，返回一个新的类型定义

```typescript
interface ITest {
    name: string;
    age: number;
    sex: string;
}
type TTest = Pick<ITest, 'age' | 'sex'>;

// 相当于
interface ITest1 {
    age: number;
    sex: string;
}
```

## Partial

`Partial`将类型中所有选项变为可选

```typescript
interface ITest {
    name: string;
    age: number;
    sex: string;
}
type TTest = Partial<ITest>;

// 相当于
interface ITest1 {
    name?: string;
    age?: number;
    sex?: string;
}
```

## Required

`Required`将类型中所有选项变为必选

```typescript
interface ITest {
    name?: string;
    age?: number;
    sex?: string;
}
type TTest = Required<ITest>;

// 相当于
interface ITest1 {
    name: string;
    age: number;
    sex: string;
}
```

### Record

`Record`将 `K` 中的所有属性值都转换为 `T` 类型，并返回新的对象类型

```typescript
type ITest = 'name' | 'age' | 'address' | 'phone' | 'email' | 'id'

interface ITestModel {
    test: string;
    other: string;
}
type TTest = Record<ITest, ITestModel>;

// 相当于
interface ITest1 {
    name: ITestModel;
    age: ITestModel;
    address: ITestModel;
    phone: ITestModel;
    email: ITestModel;
    id: ITestModel;
}
```

### Extract

`Extract`提取`T`中可以赋值给`U`的类型

```typescript
type ITestModel =  'name' | 'age' | 'address' | 'phone' | 'email' ;

type TTest = Extract<ITestModel, 'name' | 'phone'>;

// 相当于
type TTest = "name" | "phone"
```

### Exclude

`Exclude`从`T`中剔除可以赋值给`U`的类型

```typescript
type ITestModel =  'name' | 'age' | 'address' | 'phone' | 'email' ;

type TTest = Exclude<ITestModel, 'name' | 'phone'>;

// 相当于
type TTest1 = "age" | "address" | "email"
```
