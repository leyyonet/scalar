import {AssignGenerics, CastApiDocResponse, CastPointer, CastPriority} from "@leyyo/cast";
import {$is, $to, Dict, ToSubIndexFnLambda} from "@leyyo/common";
import {Bind, Fqn} from "@leyyo/core";
import {FQN_PCK} from "../internal";
import {TextType} from "./text-type";
import {AnyType} from "./any-type";

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Fqn(FQN_PCK)
@AssignGenerics(2, 2, 'Record')
@Bind('static')
export class RecordType {

    static readonly priority = {
        object: 1,
        instance: [[Map, 2]],
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return $is.bareObject(value);
    }

    static cast(value: unknown): Record<any, any> {
        return $to.object(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'object', properties: {}};
        // return {type: 'array', items: {$ref: '#/components/schemas/Pet'}};
    }

    static castGen(children: Array<CastPointer>, value: unknown): Record<any, any> {
        if ($is.empty(value)) {
            return value;
        }
        this._checkChildren(children);
        return $to.dict(value, undefined, children[1].cast, children[0].cast as ToSubIndexFnLambda<string>);
    }

    static docGen(children: Array<CastPointer>, target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        this._checkChildren(children);
        return {type: 'object', properties: {}};
    }

    private static _checkChildren(children: Array<CastPointer>): void {
        if (children.length < 1) {
            children.push(TextType);
            children.push(AnyType);
        } else if (children.length < 2) {
            const val = children.pop();
            children.push(TextType);
            children.push(val);
        }
    }

    // region custom

}
