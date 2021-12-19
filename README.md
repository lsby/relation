# relation

一个简单的响应式编程工具库.

是[mobius-utils](https://github.com/we-mobius/mobius-utils)的部分封装.

## 快速开始

```typescript
import { Data, 取值, 描述关系2, 描述副作用, 设置值 } from '@lsby/relation'

// 定义值
var a = Data(0)
var b = Data(0)
var c = Data(0)

// 描述值与值的关系: c = a + b
描述关系2(c, [a, b], ([a, b]) => a + b)

// 描述当值变化后的行为
描述副作用(c, async (a) => console.log(a))

// 修改a和b的值
设置值(a, 1)
设置值(b, 2)

// 此时, 因为c依赖的a和b被修改了, 所以c也被计算为新值了.
// 因为之前描述了值变化后的行为, 所以会打印出3.

console.log(取值(c)) // 打印出3
```
