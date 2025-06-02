import {Moment} from "moment";
import {ClassLike, Dict, KeyValue, WeakFalse, WeakTrue} from "@leyyo/common";
import {CastIsLambda} from "@leyyo/cast";
import {TimeEdge, TimePart, TimePresent} from "../literals";
import {ClassHashLambda, ClassSortLambda} from "../sign";

export interface BoolUtilsLike {
    get trueItems(): Array<WeakTrue>;

    get falseItems(): Array<WeakFalse>;

    isTrue(value: unknown): boolean;

    isFalse(value: unknown): boolean;

    asString(value: boolean): string;

    asInteger(value: boolean): number;
}

export interface DateUtilsLike {
    addTime(part: TimePart, size: number, date?: unknown): Date;

    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean;

    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean;

    execSubEquality(equality: ScalarEqualityDate, part: number): ScalarEqualityDateResult;

    readPartByPresent(present: TimePresent, mom: Moment): number;

    runAmount(amount: TimeAmountTuple, mom: Moment, multiplier: 1 | -1): void;

    runEdge(edge: TimeEdgeTuple, mom: Moment): void;
}

export interface NumberUtilsLike {
    isDivisibleBy(value: number, num: number): boolean;

    inRange(value: number, min: number, max: number): boolean;

    inRangeInt(value: number, min: number, max: number): boolean;
}

export interface IdUtilsLike {
    /**
     * Generated uuid by version
     * */
    newUuid(version?: string | number): string;

    isUuid(value: string): boolean;

    readonly emptyUuid: string;
}

export interface StringUtilsLike {
    // region string-line
    hasLine(str: string): boolean;

    hasWhiteSpace(str: string): boolean;

    hasEmptyLine(str: string): boolean;

    lineCount(str: string): number;

    cropLines(str: string, max: number, delimiter?: string): string;

    stripEmptyLines(str: string, delimiter?: ScalarEmptyLine): string;

    // endregion string-line
    // region string-tab
    hasTab(str: string): boolean;

    removeTabs(str: string, replacement?: string): string;

    // endregion fn-tab
    // region string-word
    wordCount(str: string): number;

    cropWords(str: string, max: number): string;

    // endregion string-word
    // region string-html
    hasHtmlTag(str: string): boolean;

    stripTags(input: string, allowed: Array<string>): string;

    stripTagsForbidden(input: string, allowed: Array<string>): string;

    stripTagsAll(value: string): string;

    regexpToString(pattern: string | [string, string] | RegExp): string;

    // endregion string-html
}

export interface ArrayUtilsLike {
    isFilled(value: unknown): boolean;

    isEvery(value: unknown, fn: CastIsLambda): boolean;

    isSome(value: unknown, fn: CastIsLambda): boolean;

    includes<T = unknown>(arr: Array<T>, seeds: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean;

    includesEvery<T = unknown>(arr: Array<T>, seeds: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean;

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
    isIntersected<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean;

    /**
     * Returns intersection with given arrays
     */
    intersection<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T>;

    /**
     * Returns difference items which in source and not in target
     */
    difference<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T>;

    /**
     * Returns union items
     */
    union<T = unknown>(arrays: Array<Array<T>>, fn?: ClassLike | ClassHashLambda<T>): Array<T>;

    /**
     * Is duplicated?
     */
    isDuplicated<T = unknown>(values: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean;

    /**
     * Removes duplicated items in an array
     */
    unique<T = unknown>(arr: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T>;

    sort<T = unknown>(arr: Array<T>, compareFn?: ClassLike | ClassSortLambda<T>): Array<T>;

    /**
     * Keep array items with given key values
     * */
    keepOrders<T = unknown>(items: Array<T>, keys: Array<string | number>, field: string): Array<T>;

    remove<T = unknown>(arr: Array<T>, deleted: Array<T>, fn?: ClassLike | ClassHashLambda<T>): number;

    crop<T = unknown>(arr: Array<T>, max: number): Array<T>;

    toObjectByKey<T = unknown, K extends KeyValue = string>(items: Array<T>, field: string, fn?: ScalarKeyLambda<T>): Record<K, T>;
}

export interface ObjectUtilsLike {
    isFilled(value: unknown): boolean;

    isEvery(value: unknown, fn: CastIsLambda): boolean;

    isSome(value: unknown, fn: CastIsLambda): boolean;

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

    deepEqual<T = unknown>(first: unknown, second: unknown, fn?: ClassLike | ClassHashLambda<T>): boolean;

    /**
     * Sort keys of object
     *
     * @param {Record<string, any>} given
     * @param {?boolean} oneLevel
     * @returns {Record<string, any>}
     */
    withSortedKeys<T = unknown>(given: Dict<T>, oneLevel?: boolean): Dict<T>;

    remove<T = unknown>(value: Dict<T>, ...keys: Array<string>): number;

    crop<T = unknown>(value: Dict<T>, max: number): Dict<T>;

    size(value: any): number;
}

export interface ScalarEquality<T> {
    equals?: T;
    not?: T;
    greaterThan?: T;
    lessThan?: T;
    in?: Array<T>;
    notIn?: Array<T>;
    between?: [T, T];
    notBetween?: [T, T];
}

export type ScalarEqualityDate = ScalarEquality<number>;

export type TimeAmountTuple = [number, TimePart];
export type TimeEdgeTuple = [TimeEdge, TimePart];
export type TimePresentTuple = [TimePresent, ScalarEqualityDate];

export interface ScalarEqualityDateResult {
    success?: boolean;
    equality?: keyof ScalarEqualityDate;
    comparison?: Array<number>;
    reason?: string;
}

export interface BufferExport {
    type: string,
    data: Uint8Array | ArrayBuffer;
}

export type ScalarKeyLambda<T = Dict> = (obj: T) => KeyValue;
export type ScalarEmptyLine = '\r\n' | '\r' | '\n';
