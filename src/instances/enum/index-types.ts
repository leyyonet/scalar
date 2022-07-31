import {Key, RecLike, TypeEnumOpt} from "@leyyo/core";
import {ArrayOpt} from "../array";
import {ObjectOpt} from "../object";
import {ScalarItemCast} from "../abstract";

export type EnumAlias<T = Key> = T;
export interface EnumOpt<T = Key> extends TypeEnumOpt<T & Key> {
    def?: T;
}
export interface EnumCast extends ScalarItemCast<EnumAlias, EnumOpt> {
    cast<T2 = Key>(value: unknown, opt?: EnumOpt): T2;
    castObjectOf<T2 = Key>(value: unknown, opt?: ObjectOpt & EnumOpt): RecLike<T2>;
    castArrayOf<T2 = Key>(value: unknown, opt?: ArrayOpt & EnumOpt): Array<T2>;
}
