import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$to, Dict, WeakFalse, WeakFalseItems, WeakTrue, WeakTrueItems} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('Bool')
@Bind('static')
export class BooleanType {
    static readonly priority = {
        boolean: 1,
        string: 3,
        number: 3,
        bigint: 3,
    } as CastPriority;

    static is(value: unknown): boolean {
        if (['boolean', 'number'].includes(typeof value)) {
            return true;
        }
        return WeakTrueItems.includes(value as WeakTrue) || WeakFalseItems.includes(value as WeakFalse);
    }

    static cast(value: unknown): boolean {
        return $to.boolean(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'boolean'};
    }
}

castPool.copy(BooleanType, Boolean);
