import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Integer', 'Int')
@Bind('static')
export class IntegerType {
    static readonly priority = {
        number: 2,
        string: 5,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.integer(value);
    }
    static exact(value: unknown): boolean {
        return Number.isInteger(value);
    }

    static cast(value: unknown): number {
        return $to.integer(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'number'});
    }
}
export const Integer = IntegerType;
export const Int = IntegerType;
