// noinspection JSUnusedGlobalSymbols

import {FuncLike, Key, leyyo, RecLike} from "@leyyo/core";
import {Bind, Fqn} from "@leyyo/fqn";
import {COMPONENT_NAME, FQN_NAME} from "../internal-component";
import {
    AnyCast,
    anyType,
    ArrayCast,
    ArrayOpt,
    arrayType,
    BooleanAlias,
    BooleanCast,
    BooleanOpt,
    booleanType,
    DateAlias,
    DateCast,
    DateOpt,
    dateType,
    EnumAlias,
    EnumCast,
    EnumOpt,
    enumType,
    FloatAlias,
    FloatCast,
    FloatOpt,
    floatType,
    FuncCast,
    FuncOpt,
    funcType,
    IntegerAlias,
    IntegerCast,
    IntegerOpt,
    integerType,
    ObjectCast,
    ObjectOpt,
    objectType,
    StringAlias,
    StringCast,
    StringOpt,
    stringType,
    TextAlias,
    TextCast,
    TextOpt,
    textType,
    TimePart, UuidAlias,
    UuidCast,
    UuidOpt,
    uuidType
} from "../components";
import {ScalarLike} from "./index-types";
import {AbstractScalar} from "../abstract";

// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@Bind()
export class Scalar implements ScalarLike {
    // region constructor
    constructor() {
        leyyo.component.add(COMPONENT_NAME);
        leyyo.enumeration.add('TimePart', TimePart, ...FQN_NAME);
    }
    // endregion constructor
    // region global
    isEmpty(value: unknown): boolean {
        return leyyo.is.empty(value);
    }
    isKey(value: unknown): boolean {
        return leyyo.is.key(value);
    }
    isPrimitive(value: unknown): boolean {
        return leyyo.is.primitive(value);
    }
    isValue(value: unknown): boolean {
        return leyyo.is.value(value);
    }
    // endregion global
    // region any
    get any(): AnyCast {
        return anyType;
    }
    // endregion any

    // region array
    get array(): ArrayCast {
        return arrayType;
    }
    isArray(value: unknown, opt?: ArrayOpt): boolean {
        return arrayType.is(value, opt);
    }
    toArray<T = unknown>(value: unknown, opt?: ArrayOpt): Array<T> {
        return arrayType.cast(value, opt) as Array<T>;
    }
    // endregion array

    // region boolean
    get boolean(): BooleanCast {
        return booleanType;
    }
    isBoolean(value: unknown, opt?: BooleanOpt): boolean {
        return booleanType.is(value, opt);
    }
    toBoolean(value: unknown, opt?: BooleanOpt): BooleanAlias {
        return booleanType.cast(value, opt);
    }
    // endregion boolean

    // region date
    get date(): DateCast {
        return dateType;
    }
    isDate(value: unknown, opt?: DateOpt): boolean {
        return dateType.is(value, opt);
    }
    toDate(value: unknown, opt?: DateOpt): DateAlias {
        return dateType.cast(value, opt);
    }
    // endregion date

    // region enum
    get enum(): EnumCast {
        return enumType;
    }
    isEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): boolean {
        return enumType.is(value, opt);
    }
    toEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): EnumAlias<T> {
        return enumType.cast(value, opt) as EnumAlias<T>;
    }
    // endregion enum

    // region float
    get float(): FloatCast {
        return floatType;
    }
    isFloat(value: unknown, opt?: FloatOpt): boolean {
        return floatType.is(value, opt);
    }
    toFloat(value: unknown, opt?: FloatOpt): FloatAlias {
        return floatType.cast(value, opt);
    }
    // endregion float

    // region function
    get func(): FuncCast {
        return funcType;
    }
    isFunc(value: unknown, opt?: FuncOpt): boolean {
        return funcType.is(value, opt);
    }
    toFunc<T extends FuncLike = FuncLike>(value: unknown, opt?: FuncOpt): T {
        return funcType.cast(value, opt) as T;
    }
    // endregion function

    // region integer
    get integer(): IntegerCast {
        return integerType;
    }
    isInteger(value: unknown, opt?: IntegerOpt): boolean {
        return integerType.is(value, opt);
    }
    toInteger(value: unknown, opt?: IntegerOpt): IntegerAlias {
        return integerType.cast(value, opt);
    }
    // endregion integer

    // region object
    get object(): ObjectCast {
        return objectType;
    }
    isObject(value: unknown, opt?: ObjectOpt): boolean {
        return objectType.is(value, opt);
    }
    toObject<T = unknown>(value: unknown, opt?: ObjectOpt): RecLike<T> {
        return objectType.cast(value, opt) as RecLike<T>;
    }
    // endregion object

    // region string
    get string(): StringCast {
        return stringType;
    }
    isString(value: unknown, opt?: StringOpt): boolean {
        return stringType.is(value, opt);
    }
    toStr(value: unknown, opt?: StringOpt): StringAlias {
        return stringType.cast(value, opt);
    }

    toString_(value: unknown, opt?: StringOpt): StringAlias {
        return stringType.cast(value, opt);
    }
    // endregion string

    // region text
    get text(): TextCast {
        return textType;
    }
    isText(value: unknown, opt?: TextOpt): boolean {
        return textType.is(value, opt);
    }
    toText(value: unknown, opt?: TextOpt): TextAlias {
        return textType.cast(value, opt);
    }
    // endregion text

    // region uuid
    get uuid(): UuidCast {
        return uuidType;
    }
    isUuid(value: unknown, opt?: UuidOpt): boolean {
        return uuidType.is(value, opt);
    }
    toUuid(value: unknown, opt?: UuidOpt): UuidAlias {
        return uuidType.cast(value, opt);
    }
    // endregion uuid
}
export const scalar = new Scalar();
AbstractScalar._scalar = scalar;
/**
 *             const ext = /(?:\.([^.]+))?$/.exec(__filename) as unknown as string;
 *             const importList = [] as Array<Promise<unknown>>;
 *             fs.readdirSync(__dirname + '/casts').forEach(file => {
 *                 if (file.endsWith(ext)) {
 *                     importList.push(require(file));
 *                 }
 *             });
 *             if (importList.length > 0) {
 *                 Promise.all(importList).then();
 *             }
 * */