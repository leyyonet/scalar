import {FuncLike, RecLike} from "@leyyo/core";
import {ScalarItemCast} from "../instances";

export type ScalarTestType = 'basic'|'array'|'object';
export interface ScalarTestItem extends RecLike {
    info: string;
    type: ScalarTestType;
    input: unknown;
    expected?: unknown;
    is?: boolean;
    error?: FuncLike|boolean;
    opt?: RecLike;
    objectKey?: FuncLike;
}
export interface ScalarTestRec {
    describe: FuncLike;
    it: FuncLike;
    cast: ScalarItemCast;
    native?: FuncLike;
    items: Array<ScalarTestItem>;
}
