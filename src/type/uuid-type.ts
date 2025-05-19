import * as uuid from 'uuid';
import {Bind, Fqn} from "@leyyo/core";
import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {$dev, $is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

@Fqn(FQN_PCK)
@AssignType('Uuid')
@Bind('static')
export class UuidType {

    static readonly priority = {
        string: 1,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        if ($is.empty(value)) {
            return false;
        }
        return typeof value === 'string' && uuid.validate(value);
    }

    static cast(value: unknown): string {
        const text = $to.text(value, () => $dev.opt({where: 'leyyo.scalar.UuidType'}));
        if (text && !uuid.validate(text)) {
            throw $dev.invalidError({issue: 'invalid.uuid', expected: ['uuid'], type: typeof value, where: 'leyyo.scalar.UuidType'});
        }
        return text;
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string'};
    }
}

export {uuid};
