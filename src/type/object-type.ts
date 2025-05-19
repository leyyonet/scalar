import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict, Obj} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType()
@Bind('static')
export class ObjectType {

    static readonly priority = {
        object: 1,
        instance: [[Map, 2]],
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.object(value);
    }

    static cast(value: unknown): Obj {
        return $to.object(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'object'};
    }

}

castPool.copy(ObjectType, Object);
