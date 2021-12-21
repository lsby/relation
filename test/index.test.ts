import 'mocha'
import { Data, 取值, 描述副作用, 设置值, 取消副作用, 创建关系值, 设置副作用 } from '../src/index'
import { 断言相等 } from '@lsby/js_tools'

describe('测试组', function () {
    it('测试1', async function () {
        // 定义值
        var a = Data(1)
        var b = Data(2)

        // 这样创建一个依赖其他值计算的值
        var c = 创建关系值([a, b], ([a, b]) => a + b)
        断言相等(取值(c), 3)

        // 可以设置c变化后的行为
        var 副作用句柄 = 设置副作用(c, async (a) => console.log(a))
        // 此时, a=1, b=2, c=a+b=3, 设置副作用会立即执行一次, 会打印出3.
        // 也可以仅描述副作用, 而不触发.
        // var 副作用句柄 = 描述副作用(c, async (a) => console.log(a))

        设置值(a, 3)
        // 此时, a=3, b=2, c=a+b=5, 触发副作用打印出5.

        设置值(b, 4)
        // 此时, a=3, b=4, c=a+b=7, 触发副作用打印出7.

        断言相等(取值(c), 7)

        // 可以取消副作用
        取消副作用(副作用句柄)
        设置值(b, 5)
        // 此时, a=3, b=5, c=a+b=8, 但不会打印出8, 因为副作用已经被取消了.

        断言相等(取值(c), 8)

        // 不可以修改依赖其他值计算的值
        try {
            设置值(c, 0)
        } catch (e) {
            console.log(e.toString())
        }

        // 可以取消依赖和手动设置依赖
        // todo

        // 计算依赖值时可以获得此值更新之前的值, 如果是第一次则是null
        var d = 创建关系值([a], ([a], d2: number | null) => {
            if (d2 == null) return a
            return a + d2
        })
        // 此时, a=3, d=a=3

        设置值(a, 4)
        // 此时, a=4, d=a+d2, d2即是上次的d, 也就是3, 所以现在d=7

        断言相等(取值(d), 7)
    })
})
