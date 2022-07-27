import {AssignException, Exception} from "@leyyo/core";
import {fqn, Fqn} from "@leyyo/fqn";


@Fqn('leyyo')
@AssignException()
export class InvalidBooleanException extends Exception {
    constructor(value: string) {
        super(`Invalid boolean with ${value}`, {value});
    }
}


@Fqn('leyyo')
@AssignException()
export class InvalidDateFormatException extends Exception {
    constructor(value: string, format: string) {
        super(`Invalid date, expected format: ${format} but actual: ${value}`, {value, format});
    }
}


@Fqn('leyyo')
@AssignException()
export class InvalidEnumValueException extends Exception {
    constructor(clazz: unknown, value: unknown) {
        if (!clazz) {
            clazz = 'UnknownEnum';
        } else if (typeof clazz !== 'string') {
            try {
                clazz = fqn.name(clazz);
            } catch (e) {
                clazz = 'UnknownEnum';
            }
        }
        super(`Invalid enum[${clazz}] with ${value}`, {value, clazz});
    }
}

@Fqn('leyyo')
@AssignException()
export class InvalidTypeException extends Exception {
    constructor(type: string, ...expected: Array<string>) {
        super(`Invalid type with ${type}`, {type, expected});
    }
}


@Fqn('leyyo')
@AssignException()
export class NumberIsNotRealException extends Exception {
    constructor(nonReal: 'NaN'|'Infinite') {
        super(`Number is not real with ${nonReal}`, {nonReal});
    }
}

@Fqn('leyyo')
@AssignException()
export class InvalidHashKeyException extends Exception {
    constructor(original: string|number, produced: unknown) {
        super(`Hash key is invalid, it's type should be string or number`, {original, produced});
    }
}