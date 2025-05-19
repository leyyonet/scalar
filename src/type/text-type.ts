import {Bind, Fqn} from "@leyyo/core";
import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

@Fqn(FQN_PCK)
@AssignType('Text')
@Bind('static')
export class TextType {

    static readonly priority = {
        string: 1,
        number: 5,
        bigint: 5,
        boolean: 5,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.text(value);
    }

    static cast(value: unknown): string {
        return $to.text(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string'};
    }
}
