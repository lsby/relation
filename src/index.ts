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
} from '@we-mobius/mobius-utils'
import { error } from '@lsby/ts_type_fun'

// 类型定义
export type Data<A> = ['Data', MData<A>]

// 构造子
export function Data<A>(a: A): Data<A> {
    return ['Data', MData.of(a)]
}

export function Data组<A extends [Data<any>]>(...arr: A): A extends [Data<infer a>] ? [Data<a>] : error<'解构失败'>
export function Data组<A extends [Data<any>, Data<any>]>(
    ...arr: A
): A extends [Data<infer a>, Data<infer b>] ? [Data<a>, Data<b>] : error<'解构失败'>
export function Data组<A extends [Data<any>, Data<any>, Data<any>]>(
    ...arr: A
): A extends [Data<infer a>, Data<infer b>, Data<infer c>] ? [Data<a>, Data<b>, Data<c>] : error<'解构失败'>
export function Data组<A extends [Data<any>, Data<any>, Data<any>, Data<any>]>(
    ...arr: A
): A extends [Data<infer a>, Data<infer b>, Data<infer c>, Data<infer d>]
    ? [Data<a>, Data<b>, Data<c>, Data<d>]
    : error<'解构失败'>
export function Data组<A extends [Data<any>, Data<any>, Data<any>, Data<any>, Data<any>]>(
    ...arr: A
): A extends [Data<infer a>, Data<infer b>, Data<infer c>, Data<infer d>, Data<infer e>]
    ? [Data<a>, Data<b>, Data<c>, Data<d>, Data<e>]
    : error<'解构失败'>
export function Data组(...arr: any): any {
    return arr
}

// 函数
export function 设置关系1<A, B>(a: Data<A>, arr: [Data<B>], f: (a: [B], past: A) => A): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | [B], past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}
export function 设置关系2<A, B, C>(a: Data<A>, arr: [Data<B>, Data<C>], f: (a: [B, C], past: A) => A): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | [B, C], past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}
export function 设置关系3<A, B, C, D>(
    a: Data<A>,
    arr: [Data<B>, Data<C>, Data<D>],
    f: (a: [B, C, D], past: A) => A,
): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | [B, C, D], past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}
export function 设置关系4<A, B, C, D, E>(
    a: Data<A>,
    arr: [Data<B>, Data<C>, Data<D>, Data<E>],
    f: (a: [B, C, D, E], past: A) => A,
): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | [B, C, D, E], past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}
export function 设置关系5<A, B, C, D, E, F>(
    a: Data<A>,
    arr: [Data<B>, Data<C>, Data<D>, Data<E>, Data<F>],
    f: (a: [B, C, D, E, F], past: A) => A,
): void {
    var fm = Mutation.ofLiftBoth((data: Vacuo | [B, C, D, E, F], past: Terminator | A) => {
        if (isVacuo(data)) return TERMINATOR
        if (isTerminator(past)) return TERMINATOR
        return f(data, past)
    })
    pipeAtom(combineLatestT(arr.map((a) => a[1])), fm, a[1])
    // @ts-ignore
    for (var v of arr) 刷新值(v)
}

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
    arr: Arr,
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
export function 描述副作用<A>(a: Data<A>, f: (a: A) => Promise<void>) {
    a[1].subscribeValue((a) => f(a))
}
export function 刷新值<A>(a: Data<A>) {
    a[1].mutate(() => a[1].value)
}
