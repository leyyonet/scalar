// noinspection JSUnusedGlobalSymbols

import {EnumAlt, FuncLike, HashLike, Key} from "@leyyo/core";
import {CastOptOne} from "@leyyo/cast";
import moment from "moment";
import {Func1} from "../../core/src";

export type ScalarOptClass = CastOptOne<string>;
export interface ScalarOptDefText extends CastOptOne<string> {
    minLength?: number;
    maxLength?: number;
    cropMax?: boolean;
}
export interface ScalarOptDefNumber extends CastOptOne<number> {
    min?: number;
    cropMin?: boolean;
    max?: number;
    cropMax?: boolean;
}

export interface ScalarOptAlpha extends ScalarOptDefText {
    pattern?: string | RegExp;
}

export type ScalarOptAny = CastOptOne;

export type ScalarOptBoolean = CastOptOne<boolean>;


export interface ScalarOptDescription extends ScalarOptDefText {
    stripTags?: boolean;
}

export type ScalarOptText = ScalarOptDefText;
export type ScalarOptDigit = ScalarOptDefText;
export type ScalarOptEmail = ScalarOptDefText;

export interface ScalarOptEnum<E extends Key = string> extends CastOptOne<E> {
    $enum?: string;
    map?: HashLike<E>;
    alt?: EnumAlt<E>;
}

export type ScalarOptFloat = ScalarOptDefNumber;

export interface ScalarOptFolder extends ScalarOptDefText {
    isAbsolute?: boolean;
    isWindows?: boolean;
}

export interface ScalarOptFunc extends CastOptOne<FuncLike> {
    min?: number;
    max?: number;
}

export type ScalarOptHostVersion = 4 | 6 | '4' | '6';
export interface ScalarOptHost extends ScalarOptDefText {
    onlyHost?: boolean;
    subdomain?: boolean;
    wildcard?: boolean;
    onlyIp?: boolean;
    ipVersion?: ScalarOptHostVersion;
}

export interface ScalarOptInt extends ScalarOptDefNumber {
    strict?: boolean;
}
export interface ScalarOptDefTime<T = string> extends CastOptOne<T> {
    now?: boolean;
}
export type ScalarOptDate = ScalarOptDefTime<Date>;
export type ScalarOptIsoDatetime = ScalarOptDefTime;
export type ScalarOptIsoDate = ScalarOptDefTime;
export type ScalarOptIsoTime = ScalarOptDefTime;
export type ScalarOptMoment = ScalarOptDefTime<moment.Moment>;

export type ScalarOptRegExp = CastOptOne<RegExp>;

export interface ScalarOptRichText extends ScalarOptDefText {
    stripTags?: boolean;
    availableTags?: Array<string>;
}

export interface ScalarOptTitle extends ScalarOptDefText {
    cropNewLines?: boolean;
    stripTags?: boolean;
}

export type ScalarOptUrl = ScalarOptDefText;
export interface ScalarOptUuid extends CastOptOne<string> {
    generate?: boolean;
}

export type ScalarCastLambda<R = unknown> = Func1<R>;
export type ScalarIsLambda = (value: unknown) => boolean;
export interface ScalarOption extends HashLike {
    severity?: 'error'|'log';
    keyOpt?: ScalarOption;
    valueOpt?: ScalarOption;
    valueFn?: FuncLike;
}
export type ScalarFindIndex<T = unknown> = (item: T) => number;