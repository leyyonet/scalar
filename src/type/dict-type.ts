import {CastGenerics, CastAlias, CastClass, CastDocCallback, CastDocResponse, CastPriority} from "@leyyo/cast";
import {$is, $to} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {FQN} from "../internal";
import {TextType} from "./text-type";
import {AnyType} from "./any-type";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastGenerics(1, 1)
@CastAlias('Dict')
@Bind('static')
export class DictType {

    static readonly priority = {
        object: 2,
        instance: [[Map, 3]],
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.object(value);
    }

    static exact(value: unknown): boolean {
        return $is.bareObject(value);
    }

    static cast(value: unknown): Record<string, any> {
        return $to.dict(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'object', additionalProperties: true});
    }

    static castGen(children: Array<CastClass>, value: unknown): Record<string, any> {
        if ($is.empty(value)) {
            return value;
        }
        this._checkChildren(children);
        const valueFn = children[0].cast;
        return $to.dict(value, undefined, valueFn, TextType.cast);
    }

    static docGen(children: Array<CastClass>, openApi: CastDocCallback): CastDocResponse {
        this._checkChildren(children);
        const valueFn = children[0].doc;
        return openApi(this, {type: 'object', additionalProperties: valueFn(openApi)});
    }

    private static _checkChildren(children: Array<CastClass>): void {
        if (children.length < 1) {
            children.push(AnyType);
        }
    }

    // region custom

}
export const Dict = DictType;
