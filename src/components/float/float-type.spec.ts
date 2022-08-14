import { strict as assert } from 'assert';
import {arrayType, objectType, floatType} from "../../index";
import {genericPool} from "@leyyo/generics";
import {castPool} from "@leyyo/cast";

describe('floatType', () => {
    describe('#cast()', () => {
        it('[if input is undefined] undefined should be converted to null', () => {
            assert.equal(castPool.run('float', undefined), null);
        });
        it('[if input is text] text value should be converted to integer', () => {
            assert.equal(castPool.run(Number, '5'), 5);
        });
        it('[if input is boolean] boolean value should be converted to integer', () => {
            assert.equal(floatType.cast(true), 1);
        });
        it('[if input is object] id property of object should be fetched as value', () => {
            assert.equal(floatType.cast({id:'5.1'}), 5.1);
        });
        it('[if input is array] first item of array should be fetched as value', () => {
            assert.equal(floatType.cast(['5.9999']), 5.9999);
        });
        it('[if input is function] return of function should be fetched as value', () => {
            assert.equal(floatType.cast(() => '5.4'), 5.4);
        });
    });
    describe('#castArray()', () => {
        it('any empty value should be fetched as []', () => {
            assert.deepEqual(genericPool.run(arrayType.childGen(floatType), '3.2'), [3.2]);
        });
        it('any empty value should be fetched as []', () => {
            assert.deepEqual(genericPool.run(arrayType.childGen(Number), '3.2'), [3.2]);
        });
        it('non-numeric not in array', () => {
            assert.deepEqual(genericPool.run([Number], '3.2'), [3.2]);
        });
        it('plain text should be first item in array', () => {
            assert.deepEqual(genericPool.run('array<float>',{id: '3.2'}), [3.2]);
        });
    });
    describe('#castHash()', () => {
        it('any empty value should be fetched as {}', () => {
            assert.deepEqual(genericPool.run(objectType.childGen(null, Number),null), {});
        });
        it('numeric key should be converted to text in object', () => {
            assert.deepEqual(genericPool.run('object<string, float>',{1: '5.1'}), {'1':5.1});
        });
    });
});