import {Bind, Fqn} from "@leyyo/core";
import {
    CastGenerics,
    CastClass,
    CastDocCallback,
    CastDocResponse,
    castHub,
    CastPriority
} from "@leyyo/cast";
import {FQN} from "../internal";
import {$is, $to, Arr, List} from "@leyyo/common";
import {AnyType} from "./any-type";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastGenerics(0, 1)
@Bind('static')
export class SetType {

    static readonly priority = {
        instance: [[Set, 1], [List, 2]],
        array: 2,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return $is.arrayLike(value);
    }

    static exact(value: unknown): boolean {
        return value instanceof Set;
    }

    static cast(value: unknown): Set<any> {
        return $to.set(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'array', items: {}, uniqueItems: true});
    }

    static castGen(children: Array<CastClass>, value: unknown): Arr {
        this._checkChildren(children);
        const valueFn = children[0].cast;
        return $to.array(value, undefined, valueFn);
    }

    static docGen(children: Array<CastClass>, openApi: CastDocCallback): CastDocResponse {
        this._checkChildren(children);
        const valueFn = children[0].doc;
        return openApi(this, {type: 'array', items: valueFn(openApi), uniqueItems: true});
    }

    private static _checkChildren(children: Array<CastClass>): void {
        if (children.length < 1) {
            children.push(AnyType);
        }
    }

    static {
        castHub.pending.addClone(SetType, Set);
    }

}


