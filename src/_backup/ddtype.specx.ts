import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import { strict as assert } from 'assert';
import {enumType} from "../enum/type";

enum ColorEnum {
    RED = 'red',
    RED_2 = 'red-2',
    RED_3 = 'RED-3',
}
enum ColorAlternative {
    C1 = ColorEnum.RED,
    C2 = ColorEnum.RED_2,
}
describe('enumType', () => {
    describe('#cast()', () => {
        it('[if text] it should find self value', () => {
            assert.equal(enumType.cast(ColorEnum.RED, {map: ColorEnum}), ColorEnum.RED);
        });
        it('[if text] it should find with key', () => {
            assert.equal(enumType.cast('RED', {map: ColorEnum}), ColorEnum.RED);
        });
        it('[if text] it should find with value', () => {
            assert.equal(enumType.cast('red', {map: ColorEnum}), ColorEnum.RED);
        });
        it('[if text] it should find with slugify', () => {
            assert.equal(enumType.cast('RED_2', {map: ColorEnum}), ColorEnum.RED_2);
        });
        it('[if text] it should find with alternative', () => {
            assert.equal(enumType.cast(ColorAlternative.C1, {map: ColorEnum, alternative: ColorAlternative}), ColorEnum.RED);
        });
        // it('[if text] it should find with alternative & slugify', () => {
        //     assert.equal(enumType.cast('c1', {map: ColorEnum, slugify: true, alternative: ColorAlternative}), ColorEnum.RED);
        // });
    });
    describe('#castArray()', () => {
        it('any empty value should be fetched as []', () => {
            assert.deepEqual(enumType.castArray(null, {map: ColorEnum}), []);
        });
        // it('[if text] it should convert to array', () => {
        //     assert.deepEqual(enumType.castArray([ColorEnum.RED, 'red', 'c2'], {map: ColorEnum, slugify: true, alternative: ColorAlternative}), [ColorEnum.RED, ColorEnum.RED, ColorEnum.RED_2]);
        // });
        // it('[if text] it should ignore to invalid keys', () => {
        //     assert.deepEqual(enumType.castArray([ColorEnum.RED, 'red', 'c2', 'x2'], {map: ColorEnum, slugify: true, alternative: ColorAlternative}), [ColorEnum.RED, ColorEnum.RED, ColorEnum.RED_2]);
        // });
    });
});