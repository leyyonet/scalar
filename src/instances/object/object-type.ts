import memoize from 'memoizee-decorator';
import {Bind, fqn, Fqn} from "@leyyo/fqn";
import {DeveloperException, Key, leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, CastIsLambda, castPool} from "@leyyo/cast";
import {AssignGeneric, GenericInput, genericPool, GenericTreeLike} from "@leyyo/generics";
import {InvalidHashKeyException} from "../../index-errors";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar} from "../abstract";
import {ObjectCast, ObjectOpt} from "./index-types";

type _T = RecLike;
type _O = ObjectOpt;

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Record')
@AssignGeneric('Record')
@Bind()
export class ObjectType extends AbstractScalar<RecLike, _O> implements ObjectCast {
    constructor() {
        super();
        castPool.copy(this, Object);
        genericPool.copy(this, Object);
    }
    private static _validate<T = unknown>(value: RecLike<T>, opt: _O): RecLike<T> {
        if (value && Object.keys(value).length > 0) {
            if (opt?.ignoreNullValues) {
                const result = {} as RecLike<T>;
                for (const [k, v] of Object.entries(value)) {
                    if (!leyyo.is.empty(v)) {
                        result[k] = v;
                    }
                }
                value = result;
            }
        }
        return (Object.keys(value).length > 0) ? value : null;
    }
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.object(value);
    }
    @memoize({})
    cast<T = unknown>(value: unknown, opt?: _O): RecLike<T> {
        return leyyo.primitive.object(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'object', properties: {}};
        // return {type: 'array', items: {$ref: '#/components/schemas/Pet'}};
    }

    gen<T = unknown>(clazz: GenericInput, value: unknown, opt?: _O): RecLike<T> {
        const tree = genericPool.toTree(clazz);
        opt = opt ?? {};
        if (tree.children.length < 1) {
            tree.children[0] = {base: 'String'};
            tree.children[1] = {base: 'Any'};
        } else if (tree.children.length < 2) {
            tree.children[1] = tree.children[0];
            tree.children[0] = {base: 'String'};
        }
        const valueOpt = opt?.children?.value;
        if (valueOpt) {
            valueOpt.fn = null;
        }
        const keyOpt = opt?.children?.key;
        if (keyOpt) {
            keyOpt.fn = null;
        }
        const obj = this.cast(value, opt);
        const result = {} as RecLike<T>;
        if (leyyo.is.object(obj, true)) {
            let index = 0;
            for (const [k, v] of Object.entries(obj)) {
                const key = genericPool.run(tree.children[0], k, keyOpt) as Key;
                if (!leyyo.is.key(key)) {
                    new InvalidHashKeyException(k, key).with(this).raise(!keyOpt?.silent);
                } else {
                    result[key] = genericPool.run(tree.children[1], v, valueOpt) as T;
                }
                index++;
            }
        }
        return ObjectType._validate(result, opt);
    }
    docGen(target: unknown, property: PropertyKey, tree: GenericTreeLike, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'object', properties: {}};
        // return {type: 'array', items: {$ref: '#/components/schemas/Pet'}};
    }
    childGen(key: GenericInput, value: GenericInput): GenericTreeLike {
        return genericPool.buildTree(fqn.name(ObjectType), key ?? String, value);
    }
    // region custom
    isFilled(value: unknown): boolean {
        return leyyo.is.object(value, true);
    }
    isEvery<T = unknown>(value: _T, fn: CastIsLambda): boolean {
        return leyyo.is.object(value, true) && Object.values(value).every(val => fn(val));
    }
    isSome<T = unknown>(value: _T, fn: CastIsLambda): boolean {
        return leyyo.is.object(value, true) && Object.values(value).some(val => fn(val));
    }
    firstKey(obj: unknown): string {
        if (!leyyo.is.object(obj, true)) {
            return null;
        }
        return AbstractScalar._scalar.array.first(Object.keys(obj));
    }
    lastKey(obj: unknown): string {
        if (!leyyo.is.object(obj, true)) {
            return null;
        }
        return AbstractScalar._scalar.array.last(Object.keys(obj));
    }
    getWithPath(value: unknown, ...keys: Array<string | number>): unknown {
        if (!leyyo.is.object(value)) {
            return value ?? null;
        }
        const key = keys.shift();
        if (!leyyo.is.key(key)) {
            throw new DeveloperException('key is not key-type', {value, key})
        }
        return this.getWithPath(value[key], ...keys);
    }
    withSortedKeys<T = unknown>(given: RecLike<T>, oneLevel?: boolean): RecLike<T> {
        const value = given as Record<string, unknown>;
        if (leyyo.is.object(value, true)) {
            return Object.keys(value).sort().reduce(
                (obj, key) => {
                    const item = value[key];
                    if (!oneLevel) {
                        if (leyyo.is.object(item, true)) {
                            obj[key] = this.withSortedKeys(value[key] as RecLike<T>, true);
                        } else if (leyyo.is.array(item, true)) {
                            const arr = [];
                            (item as Array<unknown>).forEach(val => {
                                arr.push(leyyo.is.object(val, true) ? this.withSortedKeys(val as RecLike<T>, true) : val);
                            });
                            obj[key] = arr;
                        } else {
                            obj[key] = item;
                        }
                    } else {
                        obj[key] = item;
                    }
                    return obj;
                },
                {}
            ) as RecLike<T>;
        }
        return given;
    }
    remove<T = unknown>(value: RecLike<T>, ...keys: Array<string>): number {
        let removed = 0;
        if (leyyo.is.object(value, true)) {
            keys.forEach(key => {
                if (value[key] !== undefined) {
                    delete value[key];
                    removed++;
                }
            });
        }
        return removed;
    }
    // endregion custom

}
export const objectType = new ObjectType();
