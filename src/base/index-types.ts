// noinspection JSUnusedGlobalSymbols

import {FuncLike, Key} from "@leyyo/core";
import {
    AnyCast,
    ArrayCast,
    ArrayOpt,
    BooleanAlias,
    BooleanCast,
    BooleanOpt,
    DateAlias,
    DateCast,
    DateOpt,
    EnumAlias,
    EnumCast,
    EnumOpt,
    FloatAlias,
    FloatCast,
    FloatOpt,
    FuncCast,
    FuncOpt,
    IntegerAlias,
    IntegerCast,
    IntegerOpt,
    ObjectAlias,
    ObjectCast,
    ObjectOpt,
    StringAlias,
    StringCast,
    StringOpt,
    TextAlias,
    TextCast,
    TextOpt,
    UuidAlias,
    UuidCast,
    UuidOpt
} from "../instances";

export interface ScalarLike {
    // region global
    isEmpty(value: unknown): boolean;
    isPrimitive(value: unknown): boolean;
    isValue(value: unknown): boolean;
    isKey(value: unknown): boolean;
    // endregion global

    // region any
    any: AnyCast;
    // endregion any

    // region array
    array: ArrayCast;
    isArray(value: unknown, opt?: ArrayOpt): boolean;
    toArray<T = unknown>(value: unknown, opt?: ArrayOpt): Array<T>;
    // endregion array

    // region boolean
    boolean: BooleanCast;
    isBoolean(value: unknown, opt?: BooleanOpt): boolean;
    toBoolean(value: unknown, opt?: BooleanOpt): BooleanAlias;
    // endregion boolean

    // region date
    date: DateCast;
    isDate(value: unknown, opt?: DateOpt): boolean;
    toDate(value: unknown, opt?: DateOpt): DateAlias;
    // endregion date

    // region enum
    enum: EnumCast;
    isEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): boolean;
    toEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): EnumAlias<T>;
    // endregion enum

    // region float
    float: FloatCast;
    isFloat(value: unknown, opt?: FloatOpt): boolean;
    toFloat(value: unknown, opt?: FloatOpt): FloatAlias;
    // endregion float

    // region function
    func: FuncCast;
    isFunc(value: unknown, opt?: FuncOpt): boolean;
    toFunc<T extends FuncLike = FuncLike>(value: unknown, opt?: FuncOpt): T;
    // endregion function

    // region integer
    integer: IntegerCast;
    isInteger(value: unknown, opt?: IntegerOpt): boolean;
    toInteger(value: unknown, opt?: IntegerOpt): IntegerAlias;
    // endregion integer

    // region object
    object: ObjectCast;
    isObject(value: unknown, opt?: ObjectOpt): boolean;
    toObject<T = unknown>(value: unknown, opt?: ObjectOpt): ObjectAlias<T>;
    // endregion object

    // region string
    string: StringCast;
    isString(value: unknown, opt?: StringOpt): boolean;
    toStr(value: unknown, opt?: StringOpt): StringAlias;
    toString_(value: unknown, opt?: StringOpt): StringAlias;
    // endregion string

    // region text
    text: TextCast;
    isText(value: unknown, opt?: TextOpt): boolean;
    toText(value: unknown, opt?: TextOpt): TextAlias;
    // endregion text

    // region uuid
    uuid: UuidCast;
    isUuid(value: unknown, opt?: UuidOpt): boolean;
    toUuid(value: unknown, opt?: UuidOpt): UuidAlias;
    // endregion uuid
}
