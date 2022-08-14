import {strict as assert} from "assert";
import {FuncLike} from "@leyyo/core";
import {fqn} from "@leyyo/fqn";
import {CallbackBase} from "@leyyo/callback";
import {castPool} from "@leyyo/cast";
import {genericPool} from "@leyyo/generics";
import {arrayType, objectType} from "../components";
import {ScalarTestingItem, ScalarTestingRec} from "./index-types";

// noinspection JSUnusedGlobalSymbols
export class ScalarTest {
    protected static _equal(rec: ScalarTestingRec, item: ScalarTestingItem, title: string, fn: FuncLike) {
        rec.it(title, () => {
            if (item.error) {
                assert.throws(() => fn());
            } else {
                assert.deepEqual(fn(), item.expected);
            }
        });
    }
    protected static _is(rec: ScalarTestingRec, item: ScalarTestingItem, title: string) {
        rec.it(title, () => {
            assert.deepEqual(rec.cast.is(item.input, item.opt), item.expected);
        });
    }
    protected static _isArrayOf(rec: ScalarTestingRec, item: ScalarTestingItem, title: string) {
        rec.it(title, () => {
            assert.deepEqual(rec.cast.isArrayOf(item.input, item.opt), item.expected);
        });
    }
    protected static _isObjectOf(rec: ScalarTestingRec, item: ScalarTestingItem, title: string) {
        rec.it(title, () => {
            assert.deepEqual(rec.cast.isObjectOf(item.input, item.opt), item.expected);
        });
    }
    static basic(rec: ScalarTestingRec, base: CallbackBase, item: ScalarTestingItem): void {
        rec.describe(item.info, () => {
            if (item.is) {
                this._is(rec, item, 'method: is');
            }
            else {
                this._equal(rec, item, 'method: cast', () => rec.cast.cast(item.input, item.opt));
                this._equal(rec, item, 'method: direct', () => castPool.run(rec.cast, item.input, item.opt));
                this._equal(rec, item, `instance: ${fqn.name(rec.cast)}`, () => castPool.run(fqn.name(rec.cast), item.input, item.opt));
                this._equal(rec, item, `full: ${base.basic}`, () => castPool.run(base.basic, item.input, item.opt));
                if (base.full) {
                    this._equal(rec, item, `full: ${base.full}`, () => castPool.run(base.full, item.input, item.opt));
                }
                for (const alias of base.aliases) {
                    this._equal(rec, item, `full: ${alias}`, () => castPool.run(alias, item.input, item.opt));
                }
            }
        });
    }
    static array(rec: ScalarTestingRec, base: CallbackBase, item: ScalarTestingItem): void {
        rec.describe(item.info, () => {
            if (item.is) {
                this._isArrayOf(rec, item, 'method: isArrayOf');
            }
            else {
                this._equal(rec, item, 'method: castArrayOf', () => rec.cast.castArrayOf(item.input, item.opt));
                this._equal(rec, item, 'method: direct', () => genericPool.run(arrayType.childGen(rec.cast), item.input, item.opt));
                this._equal(rec, item, `instance: [${fqn.name(rec.cast)}]`, () => genericPool.run([rec.cast], item.input, item.opt));
                this._equal(rec, item, `instance: ['${fqn.name(rec.cast)}']`, () => genericPool.run([fqn.name(rec.cast)], item.input, item.opt));
                if (rec.native) {
                    this._equal(rec, item, 'method: direct', () => genericPool.run(arrayType.childGen(rec.native), item.input, item.opt));
                    this._equal(rec, item, `native: array<${fqn.name(rec.native)}>`, () => genericPool.run(`array<${fqn.name(rec.native)}>`, item.input, item.opt));
                    this._equal(rec, item, `native: [${fqn.name(rec.native)}]`, () => genericPool.run([rec.native], item.input, item.opt));
                    this._equal(rec, item, `native: ['${fqn.name(rec.native)}']`, () => genericPool.run([fqn.name(rec.native)], item.input, item.opt));
                }
                this._equal(rec, item, `basic: array<${base.basic}>`, () => genericPool.run(`array<${base.basic}>`, item.input, item.opt));
                this._equal(rec, item, `basic: ['${base.basic}']`, () => genericPool.run([base.basic], item.input, item.opt));
                if (base.full) {
                    this._equal(rec, item, `full: array<${base.full}>`, () => genericPool.run(`array<${base.full}>`, item.input, item.opt));
                    this._equal(rec, item, `full: ['${base.full}']`, () => genericPool.run([base.full], item.input, item.opt));
                }
                for (const alias of base.aliases) {
                    this._equal(rec, item, `alias: array<${alias}>`, () => genericPool.run(`array<${alias}>`, item.input, item.opt));
                    this._equal(rec, item, `alias: ['${alias}']`, () => genericPool.run([alias], item.input, item.opt));
                }
            }
        });
    }
    static object(rec: ScalarTestingRec, base: CallbackBase, item: ScalarTestingItem): void {
        const keyName = item.objectKey ? fqn.name(item.objectKey) : 'string';
        rec.describe(item.info, () => {
            if (item.is) {
                this._isObjectOf(rec, item, 'method: isObjectOf');
            }
            else {
                this._equal(rec, item, 'method: castObjectOf', () => rec.cast.castObjectOf(item.input, item.opt));
                this._equal(rec, item, 'method: direct', () => genericPool.run(objectType.childGen(item.objectKey, rec.cast), item.input, item.opt));
                if (rec.native) {
                    this._equal(rec, item, 'method: direct', () => genericPool.run(objectType.childGen(item.objectKey, rec.native), item.input, item.opt));
                    this._equal(rec, item, `native: object<${keyName}, ${fqn.name(rec.native)}>`, () => genericPool.run(`object<${keyName}, ${fqn.name(rec.native)}>`, item.input, item.opt));
                }
                this._equal(rec, item, `basic: object<${keyName}, ${base.basic}>`, () => genericPool.run(`object<${keyName}, ${base.basic}>`, item.input, item.opt));
                if (base.full) {
                    this._equal(rec, item, `full: object<${keyName}, ${base.full}>`, () => genericPool.run(`object<${keyName}, ${base.full}>`, item.input, item.opt));
                }
                for (const alias of base.aliases) {
                    this._equal(rec, item, `alias: object<${keyName}, ${alias}>`, () => genericPool.run(`object<${keyName}, ${alias}>`, item.input, item.opt));
                }
            }
        });
    }
    static run(rec: ScalarTestingRec): void {
        const base = castPool.get(rec.cast);
        rec.describe(base.basic, () => {
            rec.items.forEach(item => {
                switch (item.type) {
                    case "basic":
                        this.basic(rec, base, item);
                        break;
                    case "object":
                        this.object(rec, base, item);
                        break;
                    case "array":
                        this.array(rec, base, item);
                        break;
                    default:
                        rec.it(`invalid type: ${item.type}`, () => {
                            assert.deepEqual(['basic', 'object', 'array'].includes(item.type), true);
                        });
                        break;
                }
            });
        });
    }
}