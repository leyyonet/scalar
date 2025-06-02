import {Arr, ClassLike, KeyValue} from "@leyyo/common";
import {CastIsLambda} from "@leyyo/cast";
import {ArrayUtilsLike, ScalarKeyLambda} from "./index.types";
import {Fqn} from "@leyyo/core";
import {FQN} from "../internal";
import {ClassHashLambda, classSigner, ClassSortLambda} from "../sign";

@Fqn(FQN)
class ArrayUtils implements ArrayUtilsLike {

    // region custom
    isFilled(value: unknown): boolean {
        return Array.isArray(value) && (value as Arr).length > 0;
    }

    isEvery<T = unknown>(value: Array<T>, fn: CastIsLambda): boolean {
        return this.isFilled(value) && (value as Arr).every(val => fn(val));
    }

    isSome<T = unknown>(value: Array<T>, fn: CastIsLambda): boolean {
        return this.isFilled(value) && (value as Arr).some(val => fn(val));
    }

    includes<T = unknown>(arr: Array<T>, seeds: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean {
        if ( !this.isFilled(arr) || this.isFilled(seeds)) {
            return false;
        }
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            return seeds.some(seed => (arr as Array<T>).includes(seed as T));
        }
        const arrHash = arr.map(item => fn2(item));
        const seedHash = seeds.map(item => fn2(item));
        return seedHash.some(seed => arrHash.includes(seed));
    }

    includesEvery<T = unknown>(arr: Array<T>, seeds: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean {
        if ( !this.isFilled(arr) || this.isFilled(seeds)) {
            return false;
        }
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            return seeds.every(seed => (arr as Array<T>).includes(seed as T));
        }
        const arrHash = arr.map(item => fn2(item));
        const seedHash = seeds.map(item => fn2(item));
        return seedHash.every(seed => arrHash.includes(seed));
    }

    first<T = unknown>(values: Array<T>): T {
        if ( !this.isFilled(values)) {
            return null;
        }
        return (values[0] !== undefined) ? values[0] : null;
    }

    last<T = unknown>(values: Array<T>): T {
        if ( !this.isFilled(values)) {
            return null;
        }
        return (values[values.length - 1] !== undefined) ? values[values.length - 1] : null;
    }

    shuffle<T = unknown>(values: Array<T>): Array<T> {
        if ( !this.isFilled(values)) {
            return [];
        }
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
        return values;
    }

    isIntersected<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean {
        return this.includes(source, target, fn);
    }

    intersection<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T> {
        if ( !this.isFilled(source) || this.isFilled(target)) {
            return [];
        }
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            return source.filter(value => target.includes(value));
        }
        const targetHash = target.map(item => fn2(item));
        return source.filter(value => targetHash.includes(fn2(value)));
    }

    difference<T = unknown>(source: Array<T>, target: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T> {
        if ( !this.isFilled(source)) {
            return [];
        }
        if ( !this.isFilled(target)) {
            return source;
        }
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            return source.filter(value => !target.includes(value));
        }
        const targetHash = target.map(item => fn2(item));
        return source.filter(value => !targetHash.includes(fn2(value)));
    }

    union<T = unknown>(arrays: Array<Array<T>>, fn?: ClassLike | ClassHashLambda<T>): Array<T> {
        const list: Array<T> = [];
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            arrays.forEach(array => {
                if (this.isFilled(array)) {
                    list.push(...array.filter(value => !list.includes(value)));
                }
            });
            return list;
        }
        arrays.forEach(array => {
            if (this.isFilled(array)) {
                array.forEach(item => {
                    const hash = fn2(item);
                    if ( !list.some(value => fn2(value) === hash)) {
                        list.push(item);
                    }
                })
            }
        });
        return list;
    }

    isDuplicated<T = unknown>(values: Array<T>, fn?: ClassLike | ClassHashLambda<T>): boolean {
        if ( !this.isFilled(values)) {
            return false;
        }
        return this.unique(values, fn).length !== values.length;
    }

    // Unique
    unique<T = unknown>(arr: Array<T>, fn?: ClassLike | ClassHashLambda<T>): Array<T> {
        if ( !this.isFilled(arr)) {
            return arr ? arr : [];
        }
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }
        return arr.filter((item, index) => {
            const hash = fn2(item);
            return arr.findIndex(another => hash === fn2(another)) === index;
        });
    }

    // Sort
    sort<T = unknown>(arr: Array<T>, compareFn?: ClassLike | ClassSortLambda<T>): Array<T> {
        if ( !this.isFilled(arr)) {
            return arr ? arr : [];
        }
        const fn2 = compareFn ? classSigner.getSort(compareFn) : undefined;
        if ( !fn2) {
            arr.sort();
            return arr;
        }
        arr.sort(fn2);
        return arr;
    }

    /**
     * Keep array items with given key values
     * */
    keepOrders<T = unknown>(items: Array<T>, keys: Array<string | number>, field: string): Array<T> {
        field = field ?? 'id';
        const map = {};
        //build map
        keys.forEach(key => {
            map[key] = null;
        });
        items.forEach(item => {
            const key = item[field];
            if (['string', 'number'].includes(typeof key)) {
                map[key] = item;
            }
        });
        //clear not fetched
        for (const [k, v] of Object.entries(map)) {
            if (v === null) {
                delete map[k];
            }
        }
        //return map as array
        return Object.values(map);
    }

    // RemoveItems
    remove<T = unknown>(arr: Array<T>, deleted: Array<T>, fn?: ClassLike | ClassHashLambda<T>): number {
        if ( !this.isFilled(arr) || !this.isFilled(deleted)) {
            return 0;
        }
        let removed = 0;
        const fn2 = fn ? classSigner.getHash(fn) : undefined;
        if ( !fn2) {
            deleted.forEach(item => {
                const index = arr.indexOf(item);
                if (index >= 0) {
                    arr.splice(index, 1);
                    removed++;
                }
            });
            return removed;
        }
        deleted.forEach(item => {
            const hash = fn2(item);
            const index = arr.findIndex(another => fn2(another) === hash);
            if (index >= 0) {
                arr.splice(index, 1);
                removed++;
            }
        });
        return removed;
    }

    // CropSize
    crop<T = unknown>(arr: Array<T>, max: number): Array<T> {
        if ( !this.isFilled(arr)) {
            return arr;
        }
        if (arr.length <= max) {
            return arr;
        }
        return arr.slice(0, max);
    }

    toObjectByKey<T = unknown, K extends KeyValue = string>(items: Array<T>, field: string, fn?: ScalarKeyLambda<T>): Record<K, T> {
        field = field ?? 'id';
        if (typeof fn !== 'function') {
            fn = (item) => (item[field] as KeyValue) ?? null;
        }
        const map = {} as Record<K, T>;
        items.forEach(item => {
            const key = fn(item);
            if (['string', 'number'].includes(typeof key)) {
                map[key] = item;
            }
        });
        return map;
    }

    // endregion custom
}

export const arrayUtils: ArrayUtilsLike = new ArrayUtils();
