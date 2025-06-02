import {Bind, Fqn} from "@leyyo/core";
import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, CastPriority, CastClass} from "@leyyo/cast";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Any')
@Bind('static')
export class AnyType {
    static readonly priority = {
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return !$is.empty(value);
    }

    static exact(value: unknown): boolean {
        return !$is.empty(value);
    }

    static cast(value: unknown): any {
        return $to.any(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {});
    }
}
export const Any = AnyType as CastClass;
