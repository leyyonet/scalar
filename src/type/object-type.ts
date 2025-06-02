import {CastBasic, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Obj} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@Bind('static')
export class ObjectType {

    static readonly priority = {
        object: 1,
        instance: [[Map, 2]],
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.object(value);
    }

    static exact(value: unknown): boolean {
        return $is.object(value);
    }

    static cast(value: unknown): Obj {
        return $to.object(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'object', additionalProperties: true});
    }

    static {
        castHub.pending.addClone(ObjectType, Object);
    }

}
