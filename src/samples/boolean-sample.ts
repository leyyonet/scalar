import {FuncLike, } from "@leyyo/core";
import {ScalarTest, ScalarTestingItem} from "../testing";
import {booleanType} from "../instances";

export function sampleBoolean(describe: FuncLike, it: FuncLike): void {
    const items: Array<ScalarTestingItem> = [];
    // region basic
    items.push({
        info: '[if input is undefined] undefined should be converted to null',
        type: 'basic',
        input: undefined,
        expected: null,
    });
    items.push({
        info: '[if input is number] positive numbers should be converted to true',
        type: 'basic',
        input: 5,
        expected: true,
    });
    items.push({
        info: '[if input is number] negative numbers should be converted to false',
        type: 'basic',
        input: -5,
        expected: false,
    });
    items.push({
        info: '[if input is number] zero should be converted to false',
        type: 'basic',
        input: 0,
        expected: false,
    });
    ['1', 'true', 't', 'yes', 'y', 'on'].forEach(value => {
        items.push({
            info: `text value "${value}" should be converted to true`,
            type: 'basic',
            input: value,
            expected: true,
        });
    });
    ['0', '-1', 'false', 'f', 'no', 'n', 'off'].forEach(value => {
        items.push({
            info: `text value "${value}" should be converted to false`,
            type: 'basic',
            input: value,
            expected: false,
        });
    });    // endregion basic
    // region array
    items.push({
        info: 'any empty value should be fetched as null',
        type: 'array',
        input: null,
        expected: null,
    });
    items.push({
        info: '[if input is number] positive numbers should be converted to true',
        type: 'array',
        input: 5,
        expected: [true],
    });
    items.push({
        info: '[if input is number] negative numbers should be converted to false',
        type: 'array',
        input: -5,
        expected: [false],
    });
    items.push({
        info: 'text value "true" should be converted to true',
        type: 'array',
        input: 'true',
        expected: [true],
    });
    items.push({
        info: 'text value "false" should be converted to true',
        type: 'array',
        input: 'false',
        expected: [false],
    });
    // endregion array
    // region object
    items.push({
        info: 'any empty value should be fetched as null',
        type: 'object',
        input: null,
        expected: null,
    });
    items.push({
        info: '[if input is number] positive numbers should be converted to true',
        type: 'object',
        input: {key: 5},
        expected: {key: true},
    });
    items.push({
        info: '[if input is number] negative numbers should be converted to false',
        type: 'object',
        input: {key: -5},
        expected: {key: false},
    });
    items.push({
        info: 'text value "true" should be converted to true',
        type: 'object',
        input: {key: 'true'},
        expected: {key: true},
    });
    items.push({
        info: 'text value "false" should be converted to true',
        type: 'object',
        input: {key: 'false'},
        expected: {key: false},
    });
    // endregion object
   ScalarTest.run({describe, it, cast: booleanType, native: Boolean, items});
}