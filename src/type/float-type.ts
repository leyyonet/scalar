import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Float', 'Double')
@Bind('static')
export class FloatType {
    static readonly priority = {
        number: 2,
        string: 5,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $to.float(value, {silent: true}) !== undefined;
    }

    static exact(value: unknown): boolean {
        return $is.number(value);
    }

    static cast(value: unknown): number {
        return $to.float(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'number'});
    }

    static {
        castHub.pending.addClone(FloatType, Number);
    }
}


export const Float = FloatType;
export const Double = FloatType;
