// noinspection JSUnusedGlobalSymbols

import {AnyTypeLike} from "../any";
import {ArrayTypeLike} from "../array";
import {BooleanTypeLike} from "../boolean";
import {DateTypeLike} from "../date";
import {EnumTypeLike} from "../enum";
import {FloatTypeLike} from "../float";
import {IntegerTypeLike} from "../integer";
import {ObjectTypeLike} from "../object";
import {StringTypeLike} from "../string";
import {TextTypeLike} from "../text";
import {UuidTypeLike} from "../uuid";
import {ScalarItemCast} from "../abstract";

export type ScalarKeyType = 'any' | 'array' | 'boolean' | 'date' | 'enum' | 'float' | 'integer' | 'object' | 'string' | 'text' | 'uuid';
export interface ScalarLike {
    $set(key: ScalarKeyType, value: ScalarItemCast): this;
    // region global
    isEmpty(value: unknown): boolean;
    isPrimitive(value: unknown): boolean;
    isValue(value: unknown): boolean;
    isKey(value: unknown): boolean;
    // endregion global

    // region getter
    get any(): AnyTypeLike;
    get unknown(): AnyTypeLike;
    get array(): ArrayTypeLike;
    get bool(): BooleanTypeLike;
    get boolean(): BooleanTypeLike;
    get date(): DateTypeLike;
    get enum(): EnumTypeLike;
    get enumeration(): EnumTypeLike;
    get float(): FloatTypeLike;
    get double(): FloatTypeLike;
    get number(): FloatTypeLike;
    get integer(): IntegerTypeLike;
    get int(): IntegerTypeLike;
    get object(): ObjectTypeLike;
    get record(): ObjectTypeLike;
    get string(): StringTypeLike;
    get text(): TextTypeLike;
    get uuid(): UuidTypeLike;
    // endregion getter
}
