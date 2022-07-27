import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import { strict as assert } from 'assert';
import {integerType} from "./type";

describe('integerType', () => {
    describe('#cast()', () => {
        it('[if input is undefined] undefined should be converted to null', () => {
            assert.equal(integerType.cast(undefined), null);
        });
        it('[if input is text] text value should be converted to integer', () => {
            assert.equal(integerType.cast('5'), 5);
        });
        it('[if input is float] float value should be converted to integer', () => {
            assert.equal(integerType.cast('5.3'), 5);
        });
        it('[if input is boolean] boolean value should be converted to integer', () => {
            assert.equal(integerType.cast(true), 1);
        });
        it('[if input is object] id property of object should be fetched as value', () => {
            assert.equal(integerType.cast({id:'5.1'}), 5);
        });
        it('[if input is array] first item of array should be fetched as value', () => {
            assert.equal(integerType.cast(['5']), 5);
        });
        it('[if input is function] return of function should be fetched as value', () => {
            assert.equal(integerType.cast(() => '5'), 5);
        });
    });
    describe('#castArray()', () => {
        it('any empty value should be fetched as []', () => {
            assert.deepEqual(integerType.castArray(null), []);
        });
        it('non-numeric not in array', () => {
            assert.deepEqual(integerType.castArray(['a', '3.2']), [3]);
        });
        it('plain text should be first item in array', () => {
            assert.deepEqual(integerType.castArray({id: '3'}), [3]);
        });
    });
    describe('#castHash()', () => {
        it('any empty value should be fetched as {}', () => {
            assert.deepEqual(integerType.castHash(null), {});
        });
        it('empty string not in object', () => {
            assert.equal(integerType.castHash({key: null}).key, undefined);
        });
        it('numeric key should be converted to text in object', () => {
            assert.deepEqual(integerType.castHash({1: '5'}), {'1':5});
        });
    });
});