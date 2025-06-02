import {ClassLike, Func, Obj} from "@leyyo/common";
import {DecoInstanceLike} from "@leyyo/core";

export interface ClassSignerLike {
    remove(target: ClassLike | Func | Obj, kind: symbol, ins?: DecoInstanceLike): boolean;

    set<T = any>(target: ClassLike | Func | Obj, kind: symbol, value: T, ins?: DecoInstanceLike): void;

    get<T = any>(target: ClassLike | Func | Obj, kind: symbol, ins?: DecoInstanceLike, throwable?: boolean): T;

    getHash<T = any>(target: ClassLike | Func | Obj, ins?: DecoInstanceLike, throwable?: boolean): ClassHashLambda<T>;

    getSort<T = any>(target: ClassLike | Func | Obj, ins?: DecoInstanceLike, throwable?: boolean): ClassSortLambda<T>;

    setHash<T = any>(target: ClassLike | Func | Obj, value: ClassHashLambda<T>, ins?: DecoInstanceLike): void;

    setSort<T = any>(target: ClassLike | Func | Obj, value: ClassSortLambda<T>, ins?: DecoInstanceLike): void;
}

export type ClassHashValue = string | number | bigint;
export type ClassHashLambda<T = any> = (item: T) => ClassHashValue;
export type ClassSortLambda<T = any> = (first: T, second: T) => ClassSortValue;
export type ClassSortValue = -1 | 0 | 1; // -1: less than, 0: equals, 1: greater than
