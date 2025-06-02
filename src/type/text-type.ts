import {Bind, Fqn} from "@leyyo/core";
import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, CastPriority} from "@leyyo/cast";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Text')
@Bind('static')
export class TextType {

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
        return $is.text(value);
    }

    static cast(value: unknown): string {
        return $to.text(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'string', format: 'trimmed'});
    }
}
export const Text = TextType;
