import {describe, expect, test} from '@jest/globals';

import {AnyType} from "../src";
import {InvalidValueError} from "@leyyo/common";

describe('anyType', () => {
    test('undefined ==> null', () => {
        expect(AnyType.cast(undefined)).toBe(undefined);
    });
    test('zero division', () => {
        expect(() => AnyType.cast(1/0)).toThrow(InvalidValueError);
    });
    test('empty string', () => {
        expect(AnyType.cast(' ')).toBe(' ');
    });
    test('string', () => {
        expect(AnyType.cast(' foo ')).toBe(' foo ');
    });
    test('function() ==> value', () => {
        expect(AnyType.cast(() => 'foo ')).toBe('foo ');
    });
    test('symbol value', () => {
        expect(() => AnyType.cast(Symbol.for("invalid"))).toThrow(InvalidValueError);
    });
});

/*
* ["//www.google.com", "//cdnblabla.cloudfront.net/css/app.css", "http://✪df.ws/123", "http://userid:password@example.com:8080", "http://userid:password@example.com:8080/", "http://userid@example.com", "http://userid@example.com/", "http://userid@example.com:8080", "http://userid@example.com:8080/", "http://userid:password@example.com", "http://userid:password@example.com/", "http://142.42.1.1/", "http://142.42.1.1:8080/", "http://➡.ws/䨹", "http://⌘.ws", "http://⌘.ws/", "http://foo.com/blah_(wikipedia)#cite-1", "http://foo.com/blah_(wikipedia)_blah#cite-1", "http://foo.com/unicode_(✪)_in_parens", "http://foo.com/(something)?after=parens", "http://☺.damowmow.com/", "http://code.google.com/events/#&product=browser", "http://j.mp", "ftp://foo.bar/baz", "http://foo.bar/?q=Test%20URL-encoded%20stuff", "http://مثال.إختبار", "http://例子.测试"].map(function(url) {
  console.log(url, validateUrl(url));
});
* */
