// noinspection JSUnusedGlobalSymbols

import {
    ArraySome,
    FuncLike,
    Key,
    RecLike,
    TypeArrayOpt,
    TypeEnumOpt,
    TypeFnLambda, TypeObjectOpt,
    TypeOpt
} from "@leyyo/core";
import {CastApiDocResponse, CastIsLambda, CastLike} from "@leyyo/cast";
import {GenericLike} from "@leyyo/generics";
import {TimePart} from "./index-enums";

// region shared
export type ScalarFindIndex<T = unknown> = (item: T) => number;
export interface ScalarDuplicatedResult extends RecLike {
    size?: number;
    duplicated?: number;
}
export type ScalarKeyLambda<T = RecLike> = (obj: T) => Key;
export type ScalarCropActOpt = boolean|'allow'|'reject'|'crop';
export type ScalarStripActOpt<S = 'strip'> = boolean|'allow'|'reject'|S;
export interface ScalarRangeOpt<A = ScalarCropActOpt> extends RecLike {
    min?: number;
    max?: number;
    crop?: A;
}
export interface ScalarItemCast<T = unknown, O extends TypeOpt = TypeOpt> extends CastLike<T, O> {
    isObjectOf?: CastIsLambda<ObjectOpt & O>;
    castObjectOf?: TypeFnLambda<RecLike<T>, ObjectOpt & O>;
    isArrayOf?: CastIsLambda<ArrayOpt & O>;
    castArrayOf?: TypeFnLambda<Array<T>, ArrayOpt & O>;
}
export type ScalarItemGen<T = unknown, O extends TypeOpt = TypeOpt> = ScalarItemCast<T, O> & GenericLike<T, O>;
// endregion shared



// region any
export type AnyAlias = unknown;
export type AnyOpt = TypeOpt;
export type AnyCast = ScalarItemCast<AnyAlias, AnyOpt>;
// endregion any
// region array
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
// endregion array
// region boolean
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
// endregion boolean
// region date
export type DateAlias = Date;
export type DateOpt = TypeOpt;
export interface DateCast extends ScalarItemCast<DateAlias, DateOpt> {
    ly_validate<T = DateAlias>(value: T, opt: DateOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: DateOpt): CastApiDocResponse;
    addTime(part: TimePart, size: number, date?: unknown): DateAlias;
    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean;
    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean;
}
// endregion date
// region enum
export type EnumAlias<T = Key> = T;
export interface EnumOpt<T = Key> extends TypeEnumOpt<T & Key> {
    def?: T;
}
export interface EnumCast extends ScalarItemCast<EnumAlias, EnumOpt> {
    cast<T2 = Key>(value: unknown, opt?: EnumOpt): T2;
    castObjectOf<T2 = Key>(value: unknown, opt?: ObjectOpt & EnumOpt): RecLike<T2>;
    castArrayOf<T2 = Key>(value: unknown, opt?: ArrayOpt & EnumOpt): Array<T2>;
}
// endregion enum
// region float
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
// endregion float
// region func
export type FuncAlias = FuncLike;
export interface FuncOpt extends TypeOpt {
    def?: FuncLike;
    param?: ScalarRangeOpt;
}
export interface FuncCast extends ScalarItemCast<FuncLike & unknown, FuncOpt> {
    cast<T = FuncLike>(value: unknown, opt?: FuncOpt): T;
    castObjectOf<T = FuncLike>(value: unknown, opt?: ObjectOpt & FuncOpt): RecLike<T>;
    castArrayOf<T = FuncLike>(value: unknown, opt?: ArrayOpt & FuncOpt): Array<T>;
}
// endregion func
// region integer
export type IntegerAlias = number;
export type IntegerOpt = NumberOpt;
export interface IntegerCast extends ScalarItemCast<IntegerAlias, IntegerOpt> {
    ly_validate<T = IntegerAlias>(value: T, opt: FloatOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: FloatOpt): CastApiDocResponse;
    inRange(value: number, min: number, max: number): boolean;
}
// endregion integer
// region object
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
// endregion object
// region string
export interface StringLinesOpt extends ScalarRangeOpt {
    ifEmpty?: ScalarStripActOpt;
}
export interface StringTabOpt extends RecLike {
    act?: ScalarStripActOpt|'replace';
    replacement?: string;
}
export interface StringHtmlOpt extends RecLike {
    act?: ScalarStripActOpt;
    tags?: true|Array<string>;
}

export type StringAlias = string;
export interface StringOpt extends TypeOpt {
    def?: string;
    required?: boolean;
    length?: ScalarRangeOpt;
    lines?: StringLinesOpt;
    words?: ScalarRangeOpt;
    tab?: StringTabOpt;
    html?: StringHtmlOpt;
}
export interface StringCast extends ScalarItemCast<StringAlias, StringOpt> {
    // region string-line
    hasLine(str: string): boolean;
    hasEmptyLine(str: string): boolean;
    lineCount(str: string): number;
    cropLines(str: string, max: number, delimiter?: string): string;
    stripEmptyLines(str: string, delimiter?: string): string;
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
    stripTagsAll(value: string): string;
    // endregion string-html
    ly_validate<T = StringAlias>(value: T, opt: StringOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: StringOpt): CastApiDocResponse;
}

// endregion string
// region text
export type TextAlias = string;
export type TextOpt = StringOpt;
export type TextCast = ScalarItemCast<TextAlias, TextOpt>;
// endregion text
// region uuid
// hh:mm:ii
export type UuidAlias = string;
export type UuidOpt = TypeOpt;
export type UuidCast = ScalarItemCast<UuidAlias, UuidOpt>;
// endregion time

// region test
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

// endregion test
// region scalar
export interface ScalarLike {
    isEmpty(value: unknown): boolean;
    isPrimitive(value: unknown): boolean;
    isValue(value: unknown): boolean;
    isKey(value: unknown): boolean;

    any: AnyCast;
    isArray(value: unknown, opt?: ArrayOpt): boolean;
    toArray<T = unknown>(value: unknown, opt?: ArrayOpt): Array<T>;
    array: ArrayCast;
    isBoolean(value: unknown, opt?: BooleanOpt): boolean;
    toBoolean(value: unknown, opt?: BooleanOpt): BooleanAlias;
    boolean: BooleanCast;
    isDate(value: unknown, opt?: DateOpt): boolean;
    toDate(value: unknown, opt?: DateOpt): DateAlias;
    date: DateCast;
    isEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): boolean;
    toEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): EnumAlias<T>;
    enum: EnumCast;
    isFloat(value: unknown, opt?: FloatOpt): boolean;
    toFloat(value: unknown, opt?: FloatOpt): FloatAlias;
    float: FloatCast;
    isFunc(value: unknown, opt?: FuncOpt): boolean;
    toFunc<T extends FuncLike = FuncLike>(value: unknown, opt?: FuncOpt): T;
    func: FuncCast;
    isInteger(value: unknown, opt?: IntegerOpt): boolean;
    toInteger(value: unknown, opt?: IntegerOpt): IntegerAlias;
    integer: IntegerCast;
    isObject(value: unknown, opt?: ObjectOpt): boolean;
    toObject<T = unknown>(value: unknown, opt?: ObjectOpt): ObjectAlias<T>;
    object: ObjectCast;
    isString(value: unknown, opt?: StringOpt): boolean;
    toStr(value: unknown, opt?: StringOpt): StringAlias;
    toString_(value: unknown, opt?: StringOpt): StringAlias;
    string: StringCast;
    isText(value: unknown, opt?: TextOpt): boolean;
    toText(value: unknown, opt?: TextOpt): TextAlias;
    text: TextCast;
    isUuid(value: unknown, opt?: UuidOpt): boolean;
    toUuid(value: unknown, opt?: UuidOpt): UuidAlias;
    uuid: UuidCast;
}
// endregion scalar
