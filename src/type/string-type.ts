import {$is, $to, Dict} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {FQN_PCK} from "../internal";
import moment from "moment";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType()
@Bind('static')
export class StringType {

    static readonly priority = {
        string: 1,
        number: 5,
        bigint: 5,
        boolean: 5,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.string(value);
    }

    static cast(value: unknown): string {
        return $to.string(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string'};
    }
}

castPool.copy(StringType, String);
