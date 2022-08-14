import { strict as assert } from 'assert';
import {castPool} from "@leyyo/cast";
import {DeveloperException} from "@leyyo/core";
import {anyType} from "./any-type";

describe('inner', () => {
    it('undefined ==> null', () => {
        assert.deepEqual(castPool.run('any', undefined), null);
    });
    it('NumberIsNotRealException for opt.$severity != error', () => {
        assert.deepEqual(anyType.cast(1/0, {silent: true}), null);
    });
    it('NumberIsNotRealException for opt.$severity == error', () => {
        expect(() => anyType.cast(1/0)).toThrow(DeveloperException);
    });
    it('empty string ==> null', () => {
        assert.deepEqual(anyType.cast(' '), ' ');
    });
    it('string ==> trimmed', () => {
        assert.deepEqual(anyType.cast(' foo '), ' foo ');
    });
    it('function() ==> value', () => {
        assert.deepEqual(anyType.cast(() => 'foo '), 'foo ');
    });
    it('InvalidTypeException for opt.$severity == error', () => {
        expect(() => anyType.cast(Symbol.for("invalid"))).toThrow(DeveloperException);
    });
    it('InvalidTypeException for opt.$severity != error', () => {
        assert.deepEqual(anyType.cast(Symbol.for("invalid"), {silent: true}), null);
    });
});

/*
* ["//www.google.com", "//cdnblabla.cloudfront.net/css/app.css", "http://✪df.ws/123", "http://userid:password@example.com:8080", "http://userid:password@example.com:8080/", "http://userid@example.com", "http://userid@example.com/", "http://userid@example.com:8080", "http://userid@example.com:8080/", "http://userid:password@example.com", "http://userid:password@example.com/", "http://142.42.1.1/", "http://142.42.1.1:8080/", "http://➡.ws/䨹", "http://⌘.ws", "http://⌘.ws/", "http://foo.com/blah_(wikipedia)#cite-1", "http://foo.com/blah_(wikipedia)_blah#cite-1", "http://foo.com/unicode_(✪)_in_parens", "http://foo.com/(something)?after=parens", "http://☺.damowmow.com/", "http://code.google.com/events/#&product=browser", "http://j.mp", "ftp://foo.bar/baz", "http://foo.bar/?q=Test%20URL-encoded%20stuff", "http://مثال.إختبار", "http://例子.测试"].map(function(url) {
  console.log(url, validateUrl(url));
});
* */