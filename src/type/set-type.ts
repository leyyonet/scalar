import {Bind, Fqn} from "@leyyo/core";
import {AssignGenerics, CastApiDocResponse, CastPointer, castPool, CastPriority} from "@leyyo/cast";
import {FQN_PCK} from "../internal";
import {$to, Arr, Dict, List} from "@leyyo/common";
import {AnyType} from "./any-type";

@Fqn(FQN_PCK)
@AssignGenerics(0, 1, 'Set')
@Bind('static')
export class SetType {

    static readonly priority = {
        instance: [[Set, 1], [List, 2]],
        array: 2,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return value instanceof Set;
    }

    static cast(value: unknown): Set<any> {
        return $to.set(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'array', items: {type: 'string'}};
    }

    static castGen(children: Array<CastPointer>, value: unknown): Arr {
        this._checkChildren(children);
        return $to.array(value, undefined, children[0].cast);
    }

    static docGen(children: Array<CastPointer>, target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        this._checkChildren(children);
        return {type: 'array', items: children[0].doc(target, property, openApi)};
    }

    private static _checkChildren(children: Array<CastPointer>): void {
        if (children.length < 1) {
            children.push(AnyType);
        }
    }

}

castPool.copy(SetType, Set);
