import {
    CastGenerics,
    CastClass,
    CastDocCallback,
    CastDocResponse,
    castHub,
    CastPriority
} from "@leyyo/cast";
import {$is, $to, ToSubIndexFnLambda} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {FQN} from "../internal";
import {TextType} from "./text-type";
import {AnyType} from "./any-type";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastGenerics(0, 2)
@Bind('static')
export class MapType {

    static readonly priority = {
        instance: [[Map, 1]],
        object: 2,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.object(value);
    }

    static exact(value: unknown): boolean {
        return value instanceof Map;
    }

    static cast(value: unknown): Map<any, any> {
        return $to.map(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'object', additionalProperties: true});
    }

    static castGen(children: Array<CastClass>, value: unknown): Record<any, any> {
        if ($is.empty(value)) {
            return value;
        }
        this._checkChildren(children);
        const keyFn = children[0].cast as ToSubIndexFnLambda<string>;
        const valueFn = children[1].cast;
        return $to.dict(value, undefined, valueFn, keyFn);
    }

    static docGen(children: Array<CastClass>, openApi: CastDocCallback): CastDocResponse {
        this._checkChildren(children);
        const valueFn = children[1].doc;
        return openApi(this, {type: 'object', additionalProperties: valueFn(openApi)});
    }

    private static _checkChildren(children: Array<CastClass>): void {
        if (children.length < 1) {
            children.push(TextType);
            children.push(AnyType);
        }
        else if (children.length < 2) {
            children.unshift(TextType);
        }
    }

    // region custom

    static {
        castHub.pending.addClone(MapType, Map);
    }

}
