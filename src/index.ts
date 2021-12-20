import {
    combineLatestT,
    Data as MData,
    isTerminator,
    isVacuo,
    Mutation,
    pipeAtom,
    Terminator,
    TERMINATOR,
    Vacuo,
    DataSubscription,
} from '@we-mobius/mobius-utils'
import { error } from '@lsby/ts_type_fun'

// 类型定义
export type Data<A> = ['Data', MData<A>]
export type 副作用句柄<A> = ['副作用句柄', DataSubscription<A>]

// 构造子
export function Data<A>(a: A): Data<A> {
    return ['Data', MData.of(a)]
}

// 函数
export type 取内部值<A> = A extends Data<infer a> ? a : error<'输入不是Data类型'>
export type 取数组内部值<A> = A extends []
    ? []
    : A extends [infer a, ...infer as]
    ? 取数组内部值<as> extends any[]
        ? [取内部值<a>, ...取数组内部值<as>]
        : error<'输入不是Data类型组'>
    : error<'输入不是Data类型组'>
export function 设置关系<A, Arr extends Data<any>[], 数组内部值 = 取数组内部值<Arr>>(
    a: Data<A>,
    arr: [...Arr],
    f: (a: 数组内部值, past: A) => A,
): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | 数组内部值, past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}

export function 设置值<A>(a: Data<A>, x: A): void {
    a[1].mutate(() => x)
}
export function 取值<A>(a: Data<A>): A {
    return a[1].value
}
export function 描述副作用<A>(a: Data<A>, f: (a: A) => Promise<void>): 副作用句柄<A> {
    var 句柄 = a[1].subscribeValue((a) => f(a))
    return ['副作用句柄', 句柄]
}
export function 取消副作用<A>(句柄: 副作用句柄<A>): void {
    句柄[1].unsubscribe()
}
export function 刷新值<A>(a: Data<A>) {
    a[1].mutate(() => a[1].value)
}
