import * as uuid from 'uuid';
import {Bind, Fqn} from "@leyyo/core";
import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, CastPriority} from "@leyyo/cast";
import {$dev, $is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Uuid')
@Bind('static')
export class UuidType {

    static readonly priority = {
        string: 2,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return this.exact(value);
    }

    static exact(value: unknown): boolean {
        if ($is.empty(value)) {
            return false;
        }
        return typeof value === 'string' && uuid.validate(value);
    }

    static cast(value: unknown): string {
        const text = $to.text(value, () => $dev.opt({where: 'leyyo.scalar.UuidType'}));
        if (text && !uuid.validate(text)) {
            throw $dev.invalidError({
                issue: 'invalid.uuid',
                expected: ['uuid'],
                type: typeof value,
                where: 'leyyo.scalar.UuidType'
            });
        }
        return text;
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'string', format: 'uuid'});
    }
}

export {uuid};
export const Uuid = UuidType;
