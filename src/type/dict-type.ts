import {AssignGenerics, CastApiDocResponse, CastPointer, CastPriority} from "@leyyo/cast";
import {$is, $to, Dict} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {FQN_PCK} from "../internal";
import {TextType} from "./text-type";

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Fqn(FQN_PCK)
@AssignGenerics(1, 1, 'Dict')
@Bind('static')
export class DictType {

    static readonly priority = {
        object: 2,
        instance: [[Map, 3]],
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.bareObject(value);
    }

    static cast(value: unknown): Record<string, any> {
        return $to.dict(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'object', properties: {}};
        // return {type: 'array', items: {$ref: '#/components/schemas/Pet'}};
    }

    static castGen(children: Array<CastPointer>, value: unknown): Record<string, any> {
        if ($is.empty(value)) {
            return value;
        }
        this._checkChildren(children);
        return $to.dict(value, undefined, children[0].cast, TextType.cast);
    }

    static docGen(children: Array<CastPointer>, target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        this._checkChildren(children);
        return {type: 'object', properties: {}};
    }

    private static _checkChildren(children: Array<CastPointer>): void {
        if (children.length < 1) {
            children.push(TextType);
        }
    }

    // region custom

}
