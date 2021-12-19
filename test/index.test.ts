import 'mocha'
import { Data, 取值, 描述关系2, 设置值 } from '../src/index'
import * as tools from '@lsby/js_tools'

describe('测试组', function () {
    it('测试1', async function () {
        var a = Data(0)
        var b = Data(0)
        var c = Data(0)

        描述关系2(c, [a, b], ([a, b]) => a + b)

        设置值(a, 1)
        设置值(b, 2)

        tools.断言相等(取值(c), 3)
    })
})
