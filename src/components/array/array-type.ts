import memoize from 'memoizee-decorator';
import {Bind, fqn, Fqn} from "@leyyo/fqn";
import {ArraySome, Key, leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, CastIsLambda, castPool} from "@leyyo/cast";
import {AssignGeneric, GenericInput, genericPool, GenericTreeLike} from "@leyyo/generics";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar, ScalarDuplicatedResult, ScalarFindIndex, ScalarKeyLambda} from "../../abstract";
import {ArrayCast, ArrayOpt} from "./index-types";

type _O = ArrayOpt;
// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Fqn(...FQN_NAME)
@AssignCast('List', 'Collection')
@AssignGeneric('List', 'Collection')
@Bind()
export class ArrayType extends AbstractScalar<ArraySome, _O> implements ArrayCast {
    readonly minGen = 1;
    readonly maxGen = 1;
    constructor() {
        super();
        castPool.copy(this, Array);
        genericPool.copy(this, Array);
    }
    private static _withDelimiter<T = unknown>(value: unknown, opt: _O): Array<T> {
        if (opt?.delimited && typeof value === 'string') {
            const delim = (typeof opt.delimited === 'string') ? opt.delimited : ',';
            return leyyo.primitive.array((value as string).split(delim), opt) ?? [];
        } else {
            return leyyo.primitive.array(value, opt) ?? [];
        }
    }
    private _validate<T = unknown>(value: Array<T>, opt: _O): Array<T> {
        if (value && value.length > 0) {
            if (opt?.ignoreNullValues) {
                value = value.filter(item => !leyyo.is.empty(item));
            }
        }
        return value;
    }
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.array(value);
    }
    @memoize({})
    cast<T = unknown>(value: unknown, opt?: _O): Array<T> {
        const result = ArrayType._withDelimiter<T>(value, opt);
        return this._validate(result, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'array', items: {type: 'string'}};
        // return {type: 'array', items: {$ref: '#/components/schemas/Pet'}};
    }

    @memoize({})
    gen<T = unknown>(clazz: GenericInput, value: unknown, opt?: _O): Array<T> {
        const tree = genericPool.toTree(clazz);
        if (tree.children.length < 1) {
            tree.children[0] = {base: 'Any'};
        }
        const child = tree.children[0];

        opt = opt ?? {};
        const valueOpt = opt?.children?.value;
        if (valueOpt) {
            valueOpt.fn = null;
        }
        for (const [k, v] of Object.entries(opt)) {
            if (valueOpt[k] === undefined) {
                valueOpt[k] = v;
            }
        }
        const result = ArrayType._withDelimiter<T>(value, opt);
        if (result && result.length > 0) {
            result.forEach((item, index) => {
                result[index] = genericPool.run(child, item, valueOpt) as T;
            });
        }
        return this._validate(result, opt);
    }
    docGen(target: unknown, property: PropertyKey, tree: GenericTreeLike, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return undefined;
    }
    childGen(item: GenericInput): GenericTreeLike {
        return genericPool.buildTree(fqn.name(ArrayType), item);
    }

    // region custom
    isFilled(value: unknown): boolean {
        return leyyo.is.array(value, true);
    }
    isEvery<T = unknown>(value: Array<T>, fn: CastIsLambda): boolean {
        return leyyo.is.array(value, true) && (value as ArraySome).every(val => fn(val));
    }
    isSome<T = unknown>(value: Array<T>, fn: CastIsLambda): boolean {
        return leyyo.is.array(value, true) && (value as ArraySome).some(val => fn(val));
    }
    includes<T = unknown>(value: Array<T>, ...seeds: Array<boolean|T>): boolean {
        if (leyyo.is.empty(value)) { return false;}
        if (Array.isArray(value)) {return false;}
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
        if (leyyo.is.empty(value)) { return false;}
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
        if (!leyyo.is.array(values, true)) {
            return null;
        }
        return (values[0] !== undefined) ? values[0] : null;
    }
    last<T = unknown>(values: Array<T>): T {
        if (!leyyo.is.array(values, true)) {
            return null;
        }
        return (values[values.length - 1] !== undefined) ? values[values.length - 1] : null;
    }
    shuffle<T = unknown>(values: Array<T>): Array<T> {
        if (!leyyo.is.array(values, true)) {
            return [];
        }
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
        return values;
    }
    isIntersected<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): boolean {
        if (!leyyo.is.array(source, true)) {
            return false;
        }
        const arrays = targets.filter(v => leyyo.is.array(v, true));
        if (arrays.length < 1) {
            return false;
        }
        if (arrays.length === 1) {
            return source.filter(value => arrays[0].includes(value)).length > 0;
        }
        return source.filter(value => arrays.every(array => array.includes(value))).length > 0;
    }
    intersection<T = unknown>(source: Array<T>, ...targets: Array<Array<T>>): Array<T> {
        if (!leyyo.is.array(source, true)) {
            return [];
        }
        const arrays = targets.filter(v => leyyo.is.array(v, true));
        if (arrays.length < 1) {
            return [];
        }
        if (arrays.length === 1) {
            return source.filter(value => arrays[0].includes(value));
        }
        return source.filter(value => arrays.every(array => array.includes(value)));
    }
    difference<T = unknown>(source: Array<T>, target: Array<T>): Array<T> {
        if (!leyyo.is.array(source, true)) {
            return [];
        }
        if (!leyyo.is.array(target, true)) {
            return source;
        }
        return source.filter(value => !target.includes(value));
    }
    union<T = unknown>(...arrays: Array<Array<T>>): Array<T> {
        const list: Array<T> = [];
        arrays.forEach(array => {
            if (leyyo.is.array(array, true)) {
                list.push(...array.filter(value => !list.includes(value)));
            }
        });
        return list;
    }
    isDuplicated<T = unknown>(values: Array<T>, findIndex?: true|ScalarFindIndex<T>, result?: ScalarDuplicatedResult): boolean {
        if (!leyyo.is.array(values, true)) {
            return false;
        }
        result = result ?? {size: values.length};
        const fn = typeof findIndex === 'function' ? findIndex : (item: T) => values.indexOf(item);
        const cloned = values.filter((item, index) => fn(item) === index);
        result.duplicated = cloned.length;
        return cloned.length !== values.length;
    }
    unique<T = unknown>(values: Array<T>, findIndex?: true|ScalarFindIndex<T>): Array<T> {
        if (!leyyo.is.array(values, true)) {
            return [];
        }
        const fn = typeof findIndex === 'function' ? findIndex : (item: T) => values.indexOf(item);
        return values.filter((item, index) => fn(item) === index);
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
    remove<T = unknown>(arr: Array<T>, ...keys: Array<T>): number {
        let removed = 0;
        if (leyyo.is.array(arr, true)) {
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
    toObjectByKey<T = unknown, K extends Key = string>(items: Array<T>, field: string, fn?: ScalarKeyLambda<T>): Record<K, T> {
        field = field ?? 'id';
        if (typeof fn !== 'function') {
            fn = (item) => (item[field] as Key) ?? null;
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
export const arrayType = new ArrayType();
