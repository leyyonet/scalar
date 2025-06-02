import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$to, WeakFalse, WeakFalseItems, WeakTrue, WeakTrueItems} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Bool')
@Bind('static')
export class BooleanType {
    static readonly priority = {
        boolean: 1,
        string: 3,
        number: 3,
        bigint: 3,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        if (['boolean', 'number'].includes(typeof value)) {
            return true;
        }
        return WeakTrueItems.includes(value as WeakTrue) || WeakFalseItems.includes(value as WeakFalse);
    }

    static exact(value: unknown): boolean {
        return typeof value === 'boolean';
    }

    static cast(value: unknown): boolean {
        return $to.boolean(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'boolean'});
    }

    static {
        castHub.pending.addClone(BooleanType, Boolean);
    }
}
export const Bool = BooleanType;
