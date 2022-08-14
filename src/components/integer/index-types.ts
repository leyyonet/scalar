import {RecLike} from "@leyyo/core";
import {CastApiDocResponse} from "@leyyo/cast";
import {FloatOpt, NumberOpt} from "../float";
import {ScalarItemCast} from "../../abstract";

export type IntegerAlias = number;
export type IntegerOpt = NumberOpt;
export interface IntegerCast extends ScalarItemCast<IntegerAlias, IntegerOpt> {
    ly_validate<T = IntegerAlias>(value: T, opt: FloatOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: FloatOpt): CastApiDocResponse;
    inRange(value: number, min: number, max: number): boolean;
}
