import {FuncLike, RecLike, TypeOpt} from "@leyyo/core";
import {ArrayOpt} from "../array";
import {ObjectOpt} from "../object";
import {ScalarItemCast, ScalarRangeOpt} from "../abstract";

export type FuncAlias = FuncLike;
export interface FuncOpt extends TypeOpt {
    def?: FuncLike;
    param?: ScalarRangeOpt;
}
export interface FuncCast extends ScalarItemCast<FuncLike & unknown, FuncOpt> {
    cast<T = FuncLike>(value: unknown, opt?: FuncOpt): T;
    castObjectOf<T = FuncLike>(value: unknown, opt?: ObjectOpt & FuncOpt): RecLike<T>;
    castArrayOf<T = FuncLike>(value: unknown, opt?: ArrayOpt & FuncOpt): Array<T>;
}
