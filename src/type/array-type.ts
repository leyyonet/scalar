import {$is, $to, Arr, List} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {CastGenerics, CastClass, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";

import {FQN} from "../internal";
import {AnyType} from "./any-type";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastGenerics(0, 1)
@Bind('static')
export class ArrayType {

    static readonly priority = {
        array: 1,
        instance: [[Set, 3], [List, 2]],
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.arrayLike(value);
    }

    static exact(value: unknown): boolean {
        return Array.isArray(value);
    }

    static cast(value: unknown): Arr {
        return $to.array(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'array', items: {}});
    }

    static castGen(children: Array<CastClass>, value: unknown): Arr {
        this._checkChildren(children);
        const valueFn = children[0].cast;
        return $to.array(value, undefined, valueFn);
    }

    static docGen(children: Array<CastClass>, openApi: CastDocCallback): CastDocResponse {
        this._checkChildren(children);
        const valueFn = children[0].doc;
        return openApi(ArrayType, {type: 'array', items: valueFn(openApi)});
    }

    private static _checkChildren(children: Array<CastClass>): void {
        if (children.length < 1) {
            children.push(AnyType);
        }
    }

    static {
        castHub.pending.addClone(ArrayType, Array);
    }

}
