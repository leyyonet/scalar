// noinspection JSUnusedGlobalSymbols

import {
    Bind, CastAlias, CastAssign,
    CastOption,
    ExceptionLike,
    FieldType,
    Fqn, GenericsAlias,
    GenericsAnyIdentifier, GenericsAssign,
    GenericsTreeLike, Injectable,
    InvalidObjectKeyException,
    leyyo,
    MultipleException, Nickname,
    RecKey,
    RecLike
} from "@leyyo/core";
import {LY_INT_FQN} from "../internal";
import {ObjectTypeLike} from "./index.type";
import {AbstractScalar, ScalarIsLambda} from "../abstract";

type _O = CastOption;

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Injectable()
@Nickname('Record', 'RecLike', 'Dict')
@GenericsAlias(Object)
@GenericsAssign('instance')
@CastAlias(Object)
@CastAssign('instance')
@Bind('instance')
@Fqn(...LY_INT_FQN)
export class ObjectType extends AbstractScalar<RecLike, _O> implements ObjectTypeLike {
    readonly genMin = 1;
    readonly genMax = 2;
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.OBJECT,
            properties: {},
        };
    }

    cast<V = unknown>(value: unknown): RecLike<V> {
        return leyyo.primitive.object(value);
    }

    gen<K extends RecKey = RecKey, V = unknown>(clazz: GenericsAnyIdentifier, value: unknown): Record<K, V> {
        const tree = leyyo.generics.toTree(clazz);
        if (tree.children.length < 1) {
            return leyyo.primitive.object(value) as Record<K, V>;
        } else if (tree.children.length < 2) {
            tree.children[1] = tree.children[0];
            tree.children[0] = {base: 'String'};
        }
        const obj = leyyo.primitive.object(value);
        if (leyyo.primitive.isObjectFilled(obj)) {
            const result = {} as Record<K, V>;
            let index = 0;
            const errors = [] as Array<ExceptionLike>;
            const keyItem = tree.children[0];
            const valueItem = tree.children[1];
            for (const [k, v] of Object.entries(value)) {
                try {
                    const key = leyyo.generics.run(keyItem, k) as K;
                    try {
                        result[key] = leyyo.generics.run(valueItem, k) as V;
                    } catch (e1) {
                        MultipleException.append(errors, `@${index}`, e1);
                    }
                } catch (e2) {
                    MultipleException.append(errors, k, e2);
                }
                index++;
            }
            if (errors.length > 0) {
                MultipleException.throwAll(errors);
            }
            return result;
        }
        return null;
    }
    // region internal
    $genBuild(key: GenericsAnyIdentifier, value: GenericsAnyIdentifier): GenericsTreeLike {
        return leyyo.generics.buildTree(leyyo.fqn.get(ObjectType), key ?? String, value);
    }
    // endregion internal
    // region custom
    isFilled(value: unknown): boolean {
        return leyyo.primitive.isObjectFilled(value);
    }
    isEvery(value: unknown, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isObjectFilled(value) && Object.values(value).every(val => fn(val));
    }
    isSome(value: unknown, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isObjectFilled(value) && Object.values(value).some(val => fn(val));
    }
    isEveryKeys(value: unknown, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isObjectFilled(value) && Object.keys(value).every(val => fn(val));
    }
    isSomeKeys(value: unknown, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isObjectFilled(value) && Object.keys(value).some(val => fn(val));
    }
    firstKey(obj: unknown): string {
        if (!leyyo.primitive.isObjectFilled(obj)) {
            return undefined;
        }
        const keys = Object.keys(obj);
        return keys.length > 0 ? keys.shift() : undefined;
    }
    lastKey(obj: unknown): string {
        if (!leyyo.primitive.isObjectFilled(obj)) {
            return undefined;
        }
        const keys = Object.keys(obj);
        return keys.length > 0 ? keys.pop() : undefined;
    }
    getWithPath(value: unknown, ...keys: Array<string | number>): unknown {
        if (!leyyo.primitive.isObjectFilled(value)) {
            return undefined;
        }
        const key = keys.shift();
        if (!leyyo.primitive.isKey(key)) {
            throw new InvalidObjectKeyException(keys.length > 0 ? keys.join('.') : null, key).with(this);
        }
        if (keys.length < 0) {
            return value[key];
        }
        return this.getWithPath(value[key], ...keys);
    }
    withSortedKeys<T = unknown>(given: RecLike<T>, oneLevel?: boolean): RecLike<T> {
        const value = given as Record<string, unknown>;
        if (leyyo.primitive.isObjectFilled(value)) {
            return Object.keys(value).sort().reduce(
                (obj, key) => {
                    const item = value[key];
                    if (!oneLevel) {
                        if (leyyo.primitive.isObjectFilled(item)) {
                            obj[key] = this.withSortedKeys(value[key] as RecLike<T>, true);
                        } else if (leyyo.primitive.isArrayFilled(item)) {
                            const arr = [];
                            (item as Array<unknown>).forEach(val => {
                                arr.push(leyyo.primitive.isObjectFilled(val) ? this.withSortedKeys(val as RecLike<T>, true) : val);
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
        if (leyyo.primitive.isObjectFilled(value)) {
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
