import {TypeOpt} from "@leyyo/core";
import {ScalarItemCast} from "../../abstract";

export type BooleanAlias = boolean;
export interface BooleanOpt extends TypeOpt {
    def?: boolean;
    strict?: boolean;
}
export interface BooleanCast extends ScalarItemCast<BooleanAlias, BooleanOpt> {
    isTrue(value: unknown): boolean;
    isFalse(value: unknown): boolean;
    stringify(value: boolean): string;
    toInteger(value: boolean): number;
}
