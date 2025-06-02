import {$is, $to} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {CastBasic, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@Bind('static')
export class StringType {

    static readonly priority = {
        string: 1,
        number: 5,
        bigint: 5,
        boolean: 5,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return typeof value === 'string';
    }

    static exact(value: unknown): boolean {
        return typeof value === 'string';
    }

    static cast(value: unknown): string {
        return $to.string(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'string'});
    }

    static {
        castHub.pending.addClone(StringType, String);
    }
}
