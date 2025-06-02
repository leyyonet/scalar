import {CastIsLambda} from "@leyyo/cast";
import {$is, Arr, ClassLike, Dict, InvalidValueException, List, Obj} from "@leyyo/common";
import {ObjectUtilsLike} from "./index.types";
import {Fqn} from "@leyyo/core";
import {FQN} from "../internal";
import {ClassHashLambda, classSigner} from "../sign";

@Fqn(FQN)
class ObjectUtils implements ObjectUtilsLike {
    isFilled(value: unknown): boolean {
        return $is.object(value) && Object.keys(value).length > 0;
    }

    isEvery(value: Obj, fn: CastIsLambda): boolean {
        return this.isFilled(value) && Object.values(value).every(val => fn(val));
    }

    isSome(value: Obj, fn: CastIsLambda): boolean {
        return this.isFilled(value) && Object.values(value).some(val => fn(val));
    }

    firstKey(obj: unknown): string {
        if ( !this.isFilled(obj)) {
            return null;
        }
        const keys = Object.keys(obj);
        return keys[0];
    }

    lastKey(obj: unknown): string {
        if ( !this.isFilled(obj)) {
            return null;
        }
        const keys = Object.keys(obj);
        return keys[keys.length - 1];
    }

    getWithPath(value: unknown, ...keys: Array<string | number>): unknown {
        if ( !this.isFilled(value)) {
            return value ?? null;
        }
        const key = keys.shift();
        if ( !$is.key(key)) {
            throw new InvalidValueException('Key is not key-type', {value, key})
        }
        return this.getWithPath(value[key], ...keys);
    }

    deepEqual<T = unknown>(first: unknown, second: unknown, fn?: ClassLike | ClassHashLambda<T>): boolean {
        if ($is.empty(first) && $is.empty(second)) {
            return true;
        }
        if (first instanceof Map) {
            first = Object.fromEntries(first.entries());
        }
        else if (first instanceof Set) {
            first = Array.from(first.values());
        }
        if (second instanceof Map) {
            second = Object.fromEntries(second.entries());
        }
        else if (second instanceof Set) {
            second = Array.from(second.values());
        }
        if ($is.object(first) && $is.object(second)) {
            if (Object.keys(first).length != Object.keys(second).length) {
                return false;
            }
            const fn2 = fn ? classSigner.getHash(fn) : undefined;
            if (fn2) {
                const firstHash = fn2(first);
                const secondHash = fn2(second);
                if ( !$is.empty(firstHash) && !$is.empty(secondHash)) {
                    return firstHash === secondHash;
                }
            }
            else {
                if ( !$is.empty(first) && !$is.empty(second)) {
                    return first === second;
                }
                else {
                    for (const key of Object.keys(first)) {
                        if ((second as Dict).hasOwnProperty(key)) {
                            if ( !this.deepEqual(first[key], second[key])) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        else if (Array.isArray(first) && Array.isArray(second)) {
            if ((first as Arr).length != (second as Arr).length) {
                return false;
            }
            return (first as Arr).every((item, index) => this.deepEqual(item, second[index]));
        }
        return (first === second);
    }

    // SortedKeys
    withSortedKeys<T = unknown>(given: Dict<T>, oneLevel?: boolean): Dict<T> {
        const value = given as Record<string, unknown>;
        if (this.isFilled(value)) {
            return Object.keys(value).sort().reduce(
                (obj, key) => {
                    const item = value[key];
                    if ( !oneLevel) {
                        if (this.isFilled(item)) {
                            obj[key] = this.withSortedKeys(value[key] as Dict<T>, true);
                        }
                        else if (Array.isArray(item)) {
                            const arr = [];
                            (item as Array<unknown>).forEach(val => {
                                arr.push($is.object(val) ? this.withSortedKeys(val as Dict<T>, true) : val);
                            });
                            obj[key] = arr;
                        }
                        else {
                            obj[key] = item;
                        }
                    }
                    else {
                        obj[key] = item;
                    }
                    return obj;
                },
                {}
            ) as Dict<T>;
        }
        return given;
    }

    // RemoveKeys
    remove<T = unknown>(value: Dict<T>, ...keys: Array<string>): number {
        let removed = 0;
        if (this.isFilled(value)) {
            keys.forEach(key => {
                if (value[key] !== undefined) {
                    delete value[key];
                    removed++;
                }
            });
        }
        return removed;
    }

    // CropSize
    crop<T = unknown>(value: Dict<T>, max: number): Dict<T> {
        if ( !this.isFilled(value)) {
            return value;
        }
        if (Object.keys(value).length <= max) {
            return value;
        }
        const obj = {} as Dict;
        let index = 0;
        for (const [k, v] of Object.entries(value)) {
            obj[k] = v;
            index++;
            if (index >= max) {
                break;
            }
        }
        return obj;
    }

    size(value: any): number {
        if (value instanceof Map) {
            return value.size;
        }
        else if (value instanceof Set) {
            return value.size;
        }
        else if (value instanceof List) {
            return value.length;
        }
        else if (Array.isArray(value)) {
            return value.length;
        }
        else if ($is.bareObject(value)) {
            return Object.keys(value).length;
        }
        return 0;
    }

    // endregion custom
}

export const objectUtils: ObjectUtilsLike = new ObjectUtils();
