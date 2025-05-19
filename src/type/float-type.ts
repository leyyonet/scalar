import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('Float', 'Double')
@Bind('static')
export class FloatType {
    static readonly priority = {
        number: 2,
        string: 5,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.number(value);
    }

    static cast(value: unknown): number {
        return $to.float(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'number'};
    }

}

castPool.copy(FloatType, Number);
