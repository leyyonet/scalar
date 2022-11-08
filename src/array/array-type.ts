import {
    ArraySome, CastAlias, CastAssign,
    CastOption,
    FieldType,
    Fqn, GenericsAlias,
    GenericsAnyIdentifier, GenericsAssign,
    GenericsTreeLike, Injectable,
    leyyo, Nickname,
    RecKey
} from "@leyyo/core";
import {
    AbstractScalar,
    ScalarDuplicatedResult,
    ScalarFindIndex,
    ScalarIsLambda,
    ScalarKeyLambda,
    ScalarOptLambdaMap
} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {ArrayTypeLike} from "./index.type";

type _O = CastOption;

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Injectable()
@Nickname('List', 'Collection')
@GenericsAlias(Array)
@CastAlias(Array)
@GenericsAssign('instance')
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class ArrayType extends AbstractScalar<ArraySome, _O> implements ArrayTypeLike {
    readonly genMin = 1;
    readonly genMax = 1;
    protected readonly _lambdaMap: ScalarOptLambdaMap<_O>;
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.ARRAY,
            items: {
                type: FieldType.STRING,
            }
        }
    }
    // region cast
    cast<I = unknown>(value: unknown | Array<I>): Array<I> {
        return leyyo.primitive.array<I>(value);
    }
    // endregion cast
    // region generics
    gen<I = unknown>(clazz: GenericsAnyIdentifier, value: unknown|Array<I>): Array<I> {
        const tree = leyyo.generics.toTree(clazz);
        if (tree.children.length < 1) {
            return leyyo.primitive.array<I>(value);
        }
        const valueItem = tree.children[0];
        return leyyo.primitive.array<I>(value, (v) => leyyo.generics.run(valueItem, v) as I);
    }
    $genBuild(item: GenericsAnyIdentifier): GenericsTreeLike {
        return leyyo.generics.buildTree(leyyo.fqn.get(ArrayType), item);
    }
    // endregion generics
    // region custom
    isFilled(value: unknown): boolean {
        return leyyo.primitive.isArrayFilled(value);
    }
    isEvery<T = unknown>(value: Array<T>, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isArrayFilled(value) && (value as ArraySome).every(val => fn(val));
    }
    isSome<T = unknown>(value: Array<T>, fn: ScalarIsLambda): boolean {
        return leyyo.primitive.isArrayFilled(value) && (value as ArraySome).some(val => fn(val));
    }
    includes<T = unknown>(value: Array<T>, ...seeds: Array<boolean|T>): boolean {
        if (!leyyo.primitive.isArrayFilled(value)) { return false;}
        if (seeds.length < 1) {return false;}
        let ignoreCase = false;
        if (typeof seeds[0] === 'boolean') {
            ignoreCase = seeds.shift() as boolean;
        }
        if (ignoreCase) {
            const cloned = ([...value] as Array<string>).map(item => item.toLowerCase());
            return seeds.some(seed => cloned.includes(seed as unknown as string));
        }
        return seeds.some(seed => (value as Array<T>).includes(seed as T));
    }
    contains(value: unknown, ...seeds: Array<boolean|string>): boolean {
        if (!leyyo.primitive.isEmpty(value)) { return false;}
        if (typeof value !== 'string') {return false;}
        if (seeds.length < 1) {return false;}
        let ignoreCase = false;
        let str = value as string;
        if (typeof seeds[0] === 'boolean') {
            ignoreCase = seeds.shift() as boolean;
        }
        if (ignoreCase) {
            str = str.toLowerCase();
            return seeds.some(seed => (typeof seed === 'string') && str.split((seed as string).toLowerCase()).length > 1);
        }
        return seeds.some(seed => (typeof seed === 'string') && str.split((seed as string)).length > 1);
    }
    first<T = unknown>(values: Array<T>): T {
        if (!leyyo.primitive.isArrayFilled(values)) { return undefined;}
        return (values[0] !== undefined) ? values[0] : null;
    }
    last<T = unknown>(values: Array<T>): T {
        if (!leyyo.primitive.isArrayFilled(values)) { return undefined;}
        return (values[values.length - 1] !== undefined) ? values[values.length - 1] : null;
    }
    shuffle<T = unknown>(values: Array<T>): Array<T> {
        if (!leyyo.primitive.isArrayFilled(values)) { return values;}
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
        return values;
    }
    isIntersected<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): boolean {
        if (!leyyo.primitive.isArrayFilled(source)) { return false;}
        const arrays = targets.filter(v => leyyo.primitive.isArrayFilled(v));
        if (arrays.length < 1) {
            return false;
        }
        if (arrays.length === 1) {
            return source.filter(value => arrays[0].includes(value)).length > 0;
        }
        return source.filter(value => arrays.every(array => array.includes(value))).length > 0;
    }
    intersection<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): Array<T> {
        if (!leyyo.primitive.isArrayFilled(source)) { return [];}
        const arrays = targets.filter(v => leyyo.primitive.isArrayFilled(v));
        if (arrays.length < 1) {
            return [];
        }
        if (arrays.length === 1) {
            return source.filter(value => arrays[0].includes(value));
        }
        return source.filter(value => arrays.every(array => array.includes(value)));
    }
    difference<T = unknown>(source: Array<T>, target: Array<T>): Array<T> {
        if (!leyyo.primitive.isArrayFilled(source)) { return [];}
        if (!leyyo.primitive.isArrayFilled(target)) { return source;}
        return source.filter(value => !target.includes(value));
    }
    union<T = unknown>(...arrays: Array<Array<T>>): Array<T> {
        const list: Array<T> = [];
        arrays.forEach(array => {
            if (leyyo.primitive.isArrayFilled(array)) {
                list.push(...array.filter(value => !list.includes(value)));
            }
        });
        return list;
    }
    isDuplicated<T = unknown>(values: Array<T>, findIndex?: true|ScalarFindIndex<T>, result?: ScalarDuplicatedResult): boolean {
        if (!leyyo.primitive.isArrayFilled(values)) {
            return false;
        }
        result = result ?? {size: values.length};
        const fn = typeof findIndex === 'function' ? findIndex : (item: T) => values.indexOf(item);
        const cloned = values.filter((item, index) => fn(item) === index);
        result.duplicated = cloned.length;
        return cloned.length !== values.length;
    }
    unique<T = unknown>(values: Array<T>, findIndex?: true|ScalarFindIndex<T>): Array<T> {
        if (!leyyo.primitive.isArrayFilled(values)) {
            return [];
        }
        const fn = typeof findIndex === 'function' ? findIndex : (item: T) => values.indexOf(item);
        return values.filter((item, index) => fn(item) === index);
    }
    keepOrders<T = unknown>(items: Array<T>, keys: Array<string | number>, field: string): Array<T> {
        if (!leyyo.primitive.isArrayFilled(items)) {
            return [];
        }
        const map = {};
        field = field ?? 'id';
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
    remove<T = unknown>(arr: Array<T>, ...keys: Array<T>): number {
        let removed = 0;
        if (leyyo.primitive.isArrayFilled(arr)) {
            keys.forEach(key => {
                const index = arr.indexOf(key);
                if (index >= 0) {
                    arr.splice(index, 1);
                    removed++;
                }
            });
        }
        return removed;
    }
    toObjectByKey<T = unknown, K extends RecKey = string>(items: Array<T>, field: string, fn?: ScalarKeyLambda<T>): Record<K, T> {
        const map = {} as Record<K, T>;
        if (leyyo.primitive.isArrayFilled(items)) {
            return map;
        }
        field = field ?? 'id';
        if (typeof fn !== 'function') {
            fn = (item) => (item[field] as RecKey) ?? null;
        }
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
