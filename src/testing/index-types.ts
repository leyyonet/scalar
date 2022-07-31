import {FuncLike, RecLike} from "@leyyo/core";
import {ScalarItemCast} from "../instances";

export type ScalarTestingType = 'basic'|'array'|'object';
export interface ScalarTestingItem extends RecLike {
    info: string;
    type: ScalarTestingType;
    input: unknown;
    expected?: unknown;
    is?: boolean;
    error?: FuncLike|boolean;
    opt?: RecLike;
    objectKey?: FuncLike;
}
export interface ScalarTestingRec {
    describe: FuncLike;
    it: FuncLike;
    cast: ScalarItemCast;
    native?: FuncLike;
    items: Array<ScalarTestingItem>;
}
