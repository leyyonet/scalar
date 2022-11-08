import {GenericsAnyIdentifier, RecKey, RecLike} from "@leyyo/core";
import {ScalarIsLambda, ScalarItemGen} from "../abstract";


export interface ObjectTypeLike extends ScalarItemGen<RecLike> {
    cast<V = unknown>(value: unknown): RecLike<V>;
    gen<K extends RecKey = RecKey, V = unknown>(clazz: GenericsAnyIdentifier, value: unknown): Record<K, V>;
    isFilled(value: unknown): boolean;
    isEvery(value: unknown, fn: ScalarIsLambda): boolean;
    isSome(value: unknown, fn: ScalarIsLambda): boolean;
    isEveryKeys(value: unknown, fn: ScalarIsLambda): boolean;
    isSomeKeys(value: unknown, fn: ScalarIsLambda): boolean;
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
