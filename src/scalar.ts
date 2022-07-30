// noinspection JSUnusedGlobalSymbols

import {FuncLike, Key, leyyo, RecLike} from "@leyyo/core";
import {Bind, Fqn} from "@leyyo/fqn";
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
    ObjectCast,
    ObjectOpt,
    ScalarLike,
    StringAlias,
    StringCast,
    StringOpt,
    TextAlias,
    TextCast,
    TextOpt,
    UuidAlias,
    UuidCast,
    UuidOpt
} from "./index-types";
import {COMPONENT_NAME, FQN_NAME} from "./internal-component";
import {TimePart} from "./index-enums";
import {
    anyType,
    AnyType,
    ArrayType,
    BooleanType,
    DateType,
    EnumType,
    FloatType,
    FunctionType,
    IntegerType,
    ObjectType,
    StringType,
    TextType,
    UuidType
} from "./casts";
import {AbstractScalar} from "./abstract-scalar";

// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@Bind()
export class Scalar implements ScalarLike {
    // region properties
    private readonly _any: AnyCast;
    private readonly _array: ArrayCast;
    private readonly _boolean: BooleanCast;
    private readonly _date: DateCast;
    private readonly _enum: EnumCast;
    private readonly _float: FloatCast;
    private readonly _func: FuncCast;
    private readonly _integer: IntegerCast;
    private readonly _object: ObjectCast;
    private readonly _string: StringCast;
    private readonly _text: TextCast;
    private readonly _uuid: UuidCast;

    // endregion properties
    // region constructor
    constructor() {
        leyyo.component.add(COMPONENT_NAME);
        leyyo.enumeration.add('TimePart', TimePart, ...FQN_NAME);

        this._any = new AnyType();
        this._array = new ArrayType() as ArrayCast;
        this._boolean = new BooleanType();
        this._date = new DateType();
        this._enum = new EnumType() as EnumCast;
        this._float = new FloatType();
        this._func = new FunctionType() as FuncCast;
        this._integer = new IntegerType();
        this._object = new ObjectType() as ObjectCast;
        this._string = new StringType();
        this._text = new TextType();
        this._uuid = new UuidType();
    }
    // endregion constructor
    get any(): AnyCast {
        return anyType;
    }

    get array(): ArrayCast {
        return this._array;
    }

    get boolean(): BooleanCast {
        return this._boolean;
    }

    get date(): DateCast {
        return this._date;
    }

    get enum(): EnumCast {
        return this._enum;
    }

    get float(): FloatCast {
        return this._float;
    }

    get func(): FuncCast {
        return this._func;
    }

    get integer(): IntegerCast {
        return this._integer;
    }

    get object(): ObjectCast {
        return this._object;
    }

    get string(): StringCast {
        return this._string;
    }

    get text(): TextCast {
        return this._text;
    }

    get uuid(): UuidCast {
        return this._uuid;
    }

    isArray(value: unknown, opt?: ArrayOpt): boolean {
        return this._array.is(value, opt);
    }

    isBoolean(value: unknown, opt?: BooleanOpt): boolean {
        return this._boolean.is(value, opt);
    }

    isDate(value: unknown, opt?: DateOpt): boolean {
        return this._date.is(value, opt);
    }

    isEmpty(value: unknown): boolean {
        return leyyo.is.empty(value);
    }

    isEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): boolean {
        return this._enum.is(value, opt);
    }

    isFloat(value: unknown, opt?: FloatOpt): boolean {
        return this._float.is(value, opt);
    }

    isFunc(value: unknown, opt?: FuncOpt): boolean {
        return this._func.is(value, opt);
    }

    isInteger(value: unknown, opt?: IntegerOpt): boolean {
        return this._integer.is(value, opt);
    }

    isKey(value: unknown): boolean {
        return leyyo.is.key(value);
    }

    isObject(value: unknown, opt?: ObjectOpt): boolean {
        return this._object.is(value, opt);
    }

    isPrimitive(value: unknown): boolean {
        return leyyo.is.primitive(value);
    }

    isString(value: unknown, opt?: StringOpt): boolean {
        return this._string.is(value, opt);
    }

    isText(value: unknown, opt?: TextOpt): boolean {
        return this._text.is(value, opt);
    }

    isUuid(value: unknown, opt?: UuidOpt): boolean {
        return this._uuid.is(value, opt);
    }

    isValue(value: unknown): boolean {
        return leyyo.is.value(value);
    }

    toArray<T = unknown>(value: unknown, opt?: ArrayOpt): Array<T> {
        return this._array.cast(value, opt) as Array<T>;
    }

    toBoolean(value: unknown, opt?: BooleanOpt): BooleanAlias {
        return this._boolean.cast(value, opt);
    }

    toDate(value: unknown, opt?: DateOpt): DateAlias {
        return this._date.cast(value, opt);
    }

    toEnum<T extends Key = Key>(value: unknown, opt?: EnumOpt<T>): EnumAlias<T> {
        return this._enum.cast(value, opt) as EnumAlias<T>;
    }

    toFloat(value: unknown, opt?: FloatOpt): FloatAlias {
        return this._float.cast(value, opt);
    }

    toFunc<T extends FuncLike = FuncLike>(value: unknown, opt?: FuncOpt): T {
        return this._func.cast(value, opt) as T;
    }

    toInteger(value: unknown, opt?: IntegerOpt): IntegerAlias {
        return this._integer.cast(value, opt);
    }

    toObject<T = unknown>(value: unknown, opt?: ObjectOpt): RecLike<T> {
        return this._object.cast(value, opt) as RecLike<T>;
    }

    toStr(value: unknown, opt?: StringOpt): StringAlias {
        return this._string.cast(value, opt);
    }

    toString_(value: unknown, opt?: StringOpt): StringAlias {
        return this._string.cast(value, opt);
    }

    toText(value: unknown, opt?: TextOpt): TextAlias {
        return this._text.cast(value, opt);
    }

    toUuid(value: unknown, opt?: UuidOpt): UuidAlias {
        return this._uuid.cast(value, opt);
    }
}
export const scalar = new Scalar();
AbstractScalar.SCALAR = scalar;
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