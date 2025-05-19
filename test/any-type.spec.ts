import {describe, expect, test} from '@jest/globals';

import { strict as assert } from 'assert';
import {castPool} from "@leyyo/cast";
import {anyType} from "../src";
import {InvalidValueException} from "@leyyo/common";

describe('anyType', () => {
    test('undefined ==> null', () => {
        expect(castPool.run('any', undefined)).toBe(null);
    });
    test('zero division', () => {
        expect(() => anyType.cast(1/0)).toThrow(InvalidValueException);
    });
    test('empty string', () => {
        expect(anyType.cast(' ')).toBe(' ');
    });
    test('string', () => {
        expect(anyType.cast(' foo ')).toBe(' foo ');
    });
    test('function() ==> value', () => {
        expect(anyType.cast(() => 'foo ')).toBe('foo ');
    });
    test('symbol value', () => {
        expect(() => anyType.cast(Symbol.for("invalid"))).toThrow(InvalidValueException);
    });
});

/*
* ["//www.google.com", "//cdnblabla.cloudfront.net/css/app.css", "http://✪df.ws/123", "http://userid:password@example.com:8080", "http://userid:password@example.com:8080/", "http://userid@example.com", "http://userid@example.com/", "http://userid@example.com:8080", "http://userid@example.com:8080/", "http://userid:password@example.com", "http://userid:password@example.com/", "http://142.42.1.1/", "http://142.42.1.1:8080/", "http://➡.ws/䨹", "http://⌘.ws", "http://⌘.ws/", "http://foo.com/blah_(wikipedia)#cite-1", "http://foo.com/blah_(wikipedia)_blah#cite-1", "http://foo.com/unicode_(✪)_in_parens", "http://foo.com/(something)?after=parens", "http://☺.damowmow.com/", "http://code.google.com/events/#&product=browser", "http://j.mp", "ftp://foo.bar/baz", "http://foo.bar/?q=Test%20URL-encoded%20stuff", "http://مثال.إختبار", "http://例子.测试"].map(function(url) {
  console.log(url, validateUrl(url));
});
* */