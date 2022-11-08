// noinspection JSUnusedGlobalSymbols
import {CastLambda, CastLike, CastOption, GenericsLike, RecKey, RecLike} from "@leyyo/core";

export type ScalarFindIndex<T = unknown> = (item: T) => number;
export interface ScalarDuplicatedResult extends RecLike {
    size?: number;
    duplicated?: number;
}

export type ScalarKeyLambda<T = RecLike> = (obj: T) => RecKey;
export type ScalarOptLambda<T = unknown> = (value: T) => T;
export type ScalarOptLambdaMap<O> = Record<keyof O, ScalarOptLambda>;
export type ScalarIsLambda = (value: unknown) => boolean;
export interface ScalarItemCast<T = unknown, O extends CastOption = CastOption> extends CastLike<T, O> {
    castObjectOf?: CastLambda<RecLike<T>>;
    castArrayOf?: CastLambda<Array<T>>;
    validate?(value: T, opt: O): T;
}
export interface ScalarItemGen<T = unknown, O extends CastOption = CastOption> extends GenericsLike<T, O> {
    castObjectOf?: CastLambda<RecLike<T>>;
    castArrayOf?: CastLambda<Array<T>>;
}