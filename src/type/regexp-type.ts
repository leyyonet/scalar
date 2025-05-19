import {$is, $to, Dict} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {FQN_PCK} from "../internal";

@Fqn(FQN_PCK)
@AssignType('RegExp')
@Bind('static')
export class RegexpType {
    static readonly priority = {
        instance: [[RegExp, 1]],
        string: 3,
        array: 3,
        any: 99,
    } as CastPriority;

    protected static _check(value: unknown, flags?: unknown, throwable?: boolean): RegExp {
        if ($is.empty(value)) {
            return value as undefined;
        }
        if (value instanceof RegExp) {
            return value;
        }
        if (typeof value === 'string') {
            flags = typeof flags === 'string' ? flags : 'i';
            return new RegExp(value, flags as string);
        } else if (Array.isArray(value)) {
            return this._check(value[0], value[1], throwable);
        }
        return throwable ? $to.$secure.$unexpectedError(value, ['string', 'array', 'RegExp']) : null;
    }

    static is(value: unknown): boolean {
        return this._check(value, undefined, false) !== null;
    }

    static cast(value: unknown): RegExp {
        return this._check(value, undefined, true);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string', format: 'regexp'};
    }
}

castPool.copy(RegexpType, RegExp);
