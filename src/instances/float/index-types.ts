import {RecLike, TypeOpt} from "@leyyo/core";
import {CastApiDocResponse} from "@leyyo/cast";
import {ScalarItemCast, ScalarRangeOpt} from "../abstract";

export interface NumberOpt extends TypeOpt {
    def?: number;
    value?: ScalarRangeOpt;
    divisibleBy?: number;
}
export type FloatAlias = number;
export type FloatOpt = NumberOpt;
export interface FloatCast extends ScalarItemCast<FloatAlias, FloatOpt> {
    ly_validate<T = FloatAlias>(value: T, opt: FloatOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: FloatOpt): CastApiDocResponse;
    isDivisibleBy(value: unknown, num: number): boolean;
    inRange(value: number, min: number, max: number): boolean;
}
