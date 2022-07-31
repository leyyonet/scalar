import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import { strict as assert } from 'assert';
import {textType} from "../instances/text/type";

describe('textType', () => {
    describe('#cast()', () => {
        it('[if input is undefined] undefined should be converted to null', () => {
            assert.equal(textType.cast(undefined), null);
        });
        it('[if input is string] empty value should be null', () => {
            assert.equal(textType.cast(' '), null);
        });
        it('[if input is string] value should be trimmed', () => {
            assert.equal(textType.cast(' test '), 'test');
        });
        it('[if input is numeric] numeric value should be converted to text', () => {
            assert.equal(textType.cast(5), '5');
        });
        it('[if input is boolean] boolean value should be converted to text', () => {
            assert.equal(textType.cast(true), 'true');
        });
        it('[if input is object] id property of object should be fetched as value', () => {
            assert.equal(textType.cast({id:'abc'}), 'abc');
        });
        it('[if input is array] first item of array should be fetched as value', () => {
            assert.equal(textType.cast(['abc']), 'abc');
        });
        it('[if input is function] return of function should be fetched as value', () => {
            assert.equal(textType.cast(() => 'abc'), 'abc');
        });
    });
    describe('#castArray()', () => {
        it('any empty value should be fetched as []', () => {
            assert.deepEqual(textType.castArray(null), []);
        });
        it('empty string not in array', () => {
            assert.deepEqual(textType.castArray(['', 2]), [null, "2"]);
        });
        it('plain text should be first item in array', () => {
            assert.deepEqual(textType.castArray('Veli'), ['Veli']);
        });
        it('comma delimited text should be converted to array', () => {
            assert.deepEqual(textType.castArray('1,2,3', {delimited:true}), ["1","2","3"]);
        });
    });
    describe('#castHash()', () => {
        it('any empty value should be fetched as {}', () => {
            assert.deepEqual(textType.castHash(null), {});
        });
        it('empty string not in object', () => {
            assert.equal(textType.castHash({key: null}, {$childValue: {ignoreNull: true}}).key, undefined);
        });
        it('numeric key should be converted to text in object', () => {
            assert.deepEqual(textType.castHash({1: 5}), {1:"5"});
        });
    });
/*
    describe('#castDelimited()', () => {
        it('ignore empties with comma delimited', () => {
            assert.deepEqual(textType.castDelimited(',2,3,'), ["2","3"]);
        });
    });
*/
});