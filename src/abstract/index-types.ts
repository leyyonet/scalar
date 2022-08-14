// noinspection JSUnusedGlobalSymbols

import {Key, RecLike, TypeFnLambda, TypeOpt} from "@leyyo/core";
import {CastIsLambda, CastLike} from "@leyyo/cast";
import {GenericLike} from "@leyyo/generics";
import {ArrayOpt, ObjectOpt} from "../components";

export type ScalarFindIndex<T = unknown> = (item: T) => number;
export interface ScalarDuplicatedResult extends RecLike {
    size?: number;
    duplicated?: number;
}
export type ScalarKeyLambda<T = RecLike> = (obj: T) => Key;
export type ScalarCropActOpt = boolean|'allow'|'reject'|'crop';
export type ScalarStripActOpt<S = 'strip'> = boolean|'allow'|'reject'|S;
export interface ScalarRangeOpt<A = ScalarCropActOpt> extends RecLike {
    min?: number;
    max?: number;
    crop?: A;
}
export interface ScalarItemCast<T = unknown, O extends TypeOpt = TypeOpt> extends CastLike<T, O> {
    isObjectOf?: CastIsLambda<ObjectOpt & O>;
    castObjectOf?: TypeFnLambda<RecLike<T>, ObjectOpt & O>;
    isArrayOf?: CastIsLambda<ArrayOpt & O>;
    castArrayOf?: TypeFnLambda<Array<T>, ArrayOpt & O>;
}
export type ScalarItemGen<T = unknown, O extends TypeOpt = TypeOpt> = ScalarItemCast<T, O> & GenericLike<T, O>;
