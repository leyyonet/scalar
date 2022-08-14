import {RecLike, TypeObjectOpt} from "@leyyo/core";
import {CastIsLambda} from "@leyyo/cast";
import {ArrayOpt} from "../array";
import {ScalarItemGen, ScalarRangeOpt} from "../../abstract";

export type ObjectAlias<T = unknown> = RecLike<T>;
export interface ObjectOpt extends TypeObjectOpt {
    ignoreNullValues?: boolean;
    keysOrdered?: boolean;
    items?: ScalarRangeOpt;
}
export interface ObjectCast extends ScalarItemGen<RecLike, ObjectOpt> {
    cast<T = unknown>(value: unknown, opt?: ObjectOpt): RecLike<T|unknown>;
    castObjectOf<T = unknown>(value: unknown, opt?: ObjectOpt): RecLike<RecLike<T|unknown>>;
    castArrayOf<T = unknown>(value: unknown, opt?: ArrayOpt & ObjectOpt): Array<RecLike<T|unknown>>;

    isFilled(value: unknown): boolean;
    isEvery(value: unknown, fn: CastIsLambda, opt?: ObjectOpt): boolean;
    isSome(value: unknown, fn: CastIsLambda, opt?: ObjectOpt): boolean;
    /**
     * Get first item of hash
     */
    firstKey(obj: unknown): string;
    /**
     * Get last item of hash
     */
    lastKey(obj: unknown): string;
    /**
     * Returns a value with keys
     * */
    getWithPath(value: unknown, ...keys: Array<string | number>): unknown;
    /**
     * Sort keys of object
     *
     * @param {Record<string, any>} given
     * @param {?boolean} oneLevel
     * @returns {Record<string, any>}
     */
    withSortedKeys<T = unknown>(given: RecLike<T>, oneLevel?: boolean): RecLike<T>;
    remove<T = unknown>(value: RecLike<T>, ...keys: Array<string>): number;
}
