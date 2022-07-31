import {ArraySome, Key, RecLike, TypeArrayOpt} from "@leyyo/core";
import {CastIsLambda} from "@leyyo/cast";
import {
    ScalarDuplicatedResult,
    ScalarFindIndex,
    ScalarItemGen, ScalarKeyLambda,
    ScalarRangeOpt,
    ScalarStripActOpt
} from "../abstract";
import {ObjectOpt} from "../object";

export interface ArrayOpt extends TypeArrayOpt {
    ignoreNullValues?: boolean;
    duplicated?: ScalarStripActOpt<'unique'>;
    delimited?: boolean|string;
    items?: ScalarRangeOpt;
}
export interface ArrayCast extends ScalarItemGen<ArraySome, ArrayOpt> {
    cast<T = unknown>(value: unknown, opt?: ArrayOpt): Array<T & unknown>;
    castObjectOf<T = unknown>(value: unknown, opt?: ObjectOpt & ArrayOpt): RecLike<Array<T & unknown>>;
    castArrayOf<T = unknown>(value: unknown, opt?: ArrayOpt): Array<Array<T & unknown>>;

    isFilled(value: unknown): boolean;
    isEvery(value: unknown, fn: CastIsLambda, opt?: ArrayOpt): boolean;
    isSome(value: unknown, fn: CastIsLambda, opt?: ArrayOpt): boolean;
    includes<T = unknown>(value: Array<T>, ignoreCase?: boolean, ...seeds: Array<T>): boolean;
    includes<T = unknown>(value: Array<T>, ...seeds: Array<boolean | T>): boolean;

    contains(value: unknown, ignoreCase?: boolean, ...seeds: Array<string>): boolean;

    contains(value: unknown, ...seeds: Array<boolean | string>): boolean;

    /**
     * Get first item of an array
     */
    first<T = unknown>(values: Array<T>): T;

    /**
     * Get last item of an array
     */
    last<T = unknown>(values: Array<T>): T;

    /**
     * Shuffles items in an array
     */
    shuffle<T = unknown>(values: Array<T>): Array<T>;

    /**
     * Returns intersection with given arrays
     */
    isIntersected<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): boolean;

    /**
     * Returns intersection with given arrays
     */
    intersection<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): Array<T>;

    /**
     * Returns difference items which in source and not in target
     */
    difference<T = unknown>(source: Array<T>, target: Array<T>): Array<T>;

    /**
     * Returns union items
     */
    union<T = unknown>(...arrays: Array<Array<T>>): Array<T>;

    /**
     * Is duplicated?
     */
    isDuplicated<T = unknown>(values: Array<T>, findIndex?: true | ScalarFindIndex<T>, result?: ScalarDuplicatedResult): boolean;

    /**
     * Removes duplicated items in an array
     */
    unique<T = unknown>(values: Array<T>, findIndex?: true | ScalarFindIndex<T>): Array<T>;
    /**
     * Keep array items with given key values
     * */
    keepOrders<T = unknown>(items: Array<T>, keys: Array<string | number>, field: string): Array<T>;
    remove<T = unknown>(arr: Array<T>, ...keys: Array<T>): number;
    toObjectByKey<T = unknown, K extends Key = string>(items: Array<T>, field: string, fn?: ScalarKeyLambda<T>): Record<K, T>;
}
