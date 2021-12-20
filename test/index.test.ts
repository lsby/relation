import 'mocha'
import { Data, 取值, 设置关系, 描述副作用, 设置值, 取消副作用 } from '../src/index'
import * as tools from '@lsby/js_tools'

describe('测试组', function () {
    it('测试1', async function () {
        // 定义值
        var a = Data(1)
        var b = Data(2)
        var c = Data(0)

        // 描述 c变化后的行为
        var 副作用句柄 = 描述副作用(c, async (a) => console.log(a))

        // 设置值与值的关系: c = a + b
        // 设置后, 被设置的值立即被计算.
        设置关系(c, [a, b], ([a, b]) => a + b)
        // 此时, c被设置为3, 触发副作用.

        设置值(a, 3)
        // 此时, c被设置为5, 触发副作用.

        设置值(b, 4)
        // 此时, c被设置为7, 触发副作用.

        tools.断言相等(取值(c), 7)

        取消副作用(副作用句柄)
        设置值(b, 5)
        // 此时, c被设置为8, 但不会打印出8, 因为副作用已经被取消了.
    })
})
