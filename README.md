# relation

一个简单的响应式编程工具库.

是[mobius-utils](https://github.com/we-mobius/mobius-utils)的部分封装.

## 快速开始

```typescript
import { Data, 取值, 设置关系2, 描述副作用, 设置值 } from '@lsby/relation'

// 定义值
var a = Data(1)
var b = Data(2)
var c = Data(0)

// 描述 c变化后的行为
描述副作用(c, async (a) => console.log(a))

// 设置值与值的关系: c = a + b
// 设置后, 被设置的值立即被计算.
设置关系2(c, [a, b], ([a, b]) => a + b)
// 此时, c被设置为3, 触发副作用.

设置值(a, 3)
// 此时, c被设置为5, 触发副作用.

设置值(b, 4)
// 此时, c被设置为7, 触发副作用.

console.log(取值(c)) // 打印出7
```
