import {Bind, Fqn} from "@leyyo/core";
import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

@Fqn(FQN_PCK)
@AssignType('Any', 'Unknown', 'Mixed')
@Bind('static')
export class AnyType {
    static readonly priority = {
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return !$is.empty(value);
    }

    static cast(value: unknown): any {
        return $to.any(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {$ref: 'Any'};
    }
}