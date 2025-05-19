import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('Integer', 'Int')
@Bind('static')
export class IntegerType {
    static readonly priority = {
        is: IntegerType.is,
        number: 2,
        string: 5,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.integer(value);
    }

    static cast(value: unknown): number {
        return $to.integer(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'number'};
    }

}
