// noinspection JSUnusedGlobalSymbols

import {ArraySome, Exception, HashLike, leyyo, OneOrMore} from "@leyyo/core";
import {castHelper, FieldName} from "../../../cast";
import {Fqn} from "../../../fqn";

@Fqn('leyyo', 'scalar')
export class AfterDateException extends Exception {
    constructor(field: FieldName, part: string, diff: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}Min Length`, params);
    }
}
@Fqn('leyyo', 'scalar')
export class BannedKeysException extends Exception {
    constructor(field: FieldName, params?: HashLike) {
        super(`${castHelper.view(field, true)}Min Length`, params);
    }
}
@Fqn('leyyo', 'scalar')
export class BeforeDateException extends Exception {
    constructor(field: FieldName, params?: HashLike) {
        super(`${castHelper.view(field, true)}Min Length`, params);
    }
}
@Fqn('leyyo', 'scalar')
export class EmptyValueException extends Exception {
    constructor(field: FieldName, params?: HashLike) {
        super(`${castHelper.view(field, true)}is empty`, {...params, field});
    }
}
@Fqn('leyyo', 'scalar')
export class UnexpectedTagsException extends Exception {
    constructor(field: FieldName, params?: HashLike) {
        super(`${castHelper.view(field, true)}has unexpected tags`, {...params, field});
    }
}
@Fqn('leyyo', 'scalar')
export class DuplicatedInArrayException extends Exception {
    constructor(field: FieldName, params?: HashLike) {
        super(`${castHelper.view(field, true)}values are duplicated in`, {...params, field});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidEmailException extends Exception {
    constructor(field: FieldName, value: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid email[${value}]`, {...params, field, value});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidFolderException extends Exception {
    constructor(field: FieldName, value: string, reason: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid folder[${value}] because of ${reason}`, {...params, field, value, reason});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidTitleException extends Exception {
    constructor(field: FieldName, value: string, reason: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid folder[${value}] because of ${reason}`, {...params, field, value, reason});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidRichTextException extends Exception {
    constructor(field: FieldName, value: string, reason: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid folder[${value}] because of ${reason}`, {...params, field, value, reason});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidMomentException extends Exception {
    constructor(field: FieldName, value: string, reason: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid folder[${value}] because of ${reason}`, {...params, field, value, reason});
    }
}
@Fqn('leyyo', 'scalar')
export class NotExpectedInstanceOfException extends Exception {
    constructor(field: FieldName, expected: OneOrMore<string>, current: string, params?: HashLike) {
        expected = leyyo.is.array(expected) ? (expected as ArraySome).join(', ') : expected;
        super(`${castHelper.view(field, true)}class type is not expected[${expected}] because of ${current}`, {...params, field, expected, current});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidUuidException extends Exception {
    constructor(field: FieldName, value: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid folder[${value}]`, {...params, field, value});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidHostException extends Exception {
    constructor(field: FieldName, value: string, reason: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid host[${value}] because of ${reason}`, {...params, field, value, reason});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidUrlException extends Exception {
    constructor(field: FieldName, value: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid url[${value}]`, {...params, field, value});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidBooleanException extends Exception {
    constructor(field: FieldName, value: string, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not boolean text with value[${value}]`, {...params, field, value});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidEnumException extends Exception {
    constructor(field: FieldName, name: string, value: string|number, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid enum[${name}] with value[${value}]`, {...params, field, value});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidTypeException extends Exception {
    constructor(field: FieldName, value: unknown, params?: HashLike) {
        const type = typeof value;
        super(`${castHelper.view(field, true)}has invalid type[${type}]`, {...params, field, type});
    }
}
@Fqn('leyyo', 'scalar')
export class InvalidPatternException extends Exception {
    constructor(field: FieldName, pattern: RegExp, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not tested with ${pattern?.toString()}`, {...params, field, pattern: pattern?.toString()});
    }
}

@Fqn('leyyo', 'scalar')
export class MaxItemsException extends Exception {
    constructor(field: FieldName, value: number, max: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}item size should not be greater than ${max}, but it's ${value}`, {...params, field, value, max});
    }
}
@Fqn('leyyo', 'scalar')
export class MaxLengthException extends Exception {
    constructor(field: FieldName, value: number, max: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}length should not be greater than ${max}, but it's ${value}`, {...params, field, value, max});
    }
}
@Fqn('leyyo', 'scalar')
export class MaxSizeException extends Exception {
    constructor(field: FieldName, value: number, max: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}size should not be greater than ${max}, but it's ${value}`, {...params, field, value, max});
    }
}
@Fqn('leyyo', 'scalar')
export class MaxValueException extends Exception {
    constructor(field: FieldName, value: number, max: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}value should not be greater than ${max}, but it's ${value}`, {...params, field, value, max});
    }
}
@Fqn('leyyo', 'scalar')
export class MinItemsException extends Exception {
    constructor(field: FieldName, value: number, min: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}item size should not be less than ${min}, but it's ${value}`, {...params, field, value, min});
    }
}
@Fqn('leyyo', 'scalar')
export class MinLengthException extends Exception {
    constructor(field: FieldName, value: number, min: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}length should not be less than ${min}, but it's ${value}`, {...params, field, value, min});
    }
}
@Fqn('leyyo', 'scalar')
export class MinSizeException extends Exception {
    constructor(field: FieldName, value: number, min: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}item size should not be less than ${min}, but it's ${value}`, {...params, field, value, min});
    }
}
@Fqn('leyyo', 'scalar')
export class MinValueException extends Exception {
    constructor(field: FieldName, value: number, min: number, params?: HashLike) {
        super(`${castHelper.view(field, true)}value should not be less than ${min}, but it's ${value}`, {...params, field, value, min});
    }
}
export type NumberUnrealType = 'NaN' | 'Infinite';
@Fqn('leyyo', 'scalar')
export class NumberIsNotRealException extends Exception {
    constructor(field: FieldName, nonReal: NumberUnrealType, params?: HashLike) {
        super(`${castHelper.view(field, true)}is not valid number with nonReal[${nonReal}]`, {...params, field, nonReal});
    }
}
@Fqn('leyyo', 'scalar')
export class ScalarCauseException extends Exception {
    constructor(field: FieldName, e: Error, params?: HashLike) {
        super(`${castHelper.view(field, true)}${e.message}`, {...params, field});
        this.withCause(e);
    }
}