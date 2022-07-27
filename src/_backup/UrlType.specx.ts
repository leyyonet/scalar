import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import {strict as assert} from 'assert';
import {urlType} from "../index";

const given = [
    " //www.google.com",
    "//cdn.cloudfront.net/css/app.css",
    "http://✪df.ws/123    ",
    "http://userid:password@example.com:8080",
    "http://userid:password@example.com:8080/",
    "http://userid@example.com",
    "http://userid@example.com/",
    "http://userid@example.com:8080",
    "http://userid@example.com:8080/",
    "http://userid:password@example.com",
    "http://userid:password@example.com/",
    "http://142.42.1.1/",
    "http://142.42.1.1:8080/",
    "http://➡.ws/䨹",
    "http://⌘.ws",
    "http://⌘.ws/",
    "http://foo.com/blah_(wikipedia)#cite-1",
    "http://foo.com/blah_(wikipedia)_blah#cite-1",
    "http://foo.com/unicode_(✪)_in_parens",
    "http://foo.com/(something)?after=parens",
    "http://☺.damowmow.com/",
    "http://code.google.com/events/#&product=browser",
    "http://j.mp",
    "ftp://foo.bar/baz",
    "http://foo.bar/?q=Test%20URL-encoded%20stuff",
    "http://مثال.إختبار",
    "http://例子.测试"
];
const expected = [
    "http://www.google.com",
    "http://cdn.cloudfront.net/css/app.css",
    "http://✪df.ws/123",
    "http://userid:password@example.com:8080",
    "http://userid:password@example.com:8080/",
    "http://userid@example.com",
    "http://userid@example.com/",
    "http://userid@example.com:8080",
    "http://userid@example.com:8080/",
    "http://userid:password@example.com",
    "http://userid:password@example.com/",
    "http://142.42.1.1/",
    "http://142.42.1.1:8080/",
    "http://➡.ws/䨹",
    "http://⌘.ws",
    "http://⌘.ws/",
    "http://foo.com/blah_(wikipedia)#cite-1",
    "http://foo.com/blah_(wikipedia)_blah#cite-1",
    "http://foo.com/unicode_(✪)_in_parens",
    "http://foo.com/(something)?after=parens",
    "http://☺.damowmow.com/",
    "http://code.google.com/events/#&product=browser",
    "http://j.mp",
    "ftp://foo.bar/baz",
    "http://foo.bar/?q=Test%20URL-encoded%20stuff",
    "http://مثال.إختبار",
    "http://例子.测试"
];
describe('urlType', function () {
    describe('#cast()', function () {
        given.forEach(((value, index) => {
            it(value + 'should be url', function () {
                assert.equal(urlType.cast(value), expected[index]);
            });
        }))
        it('undefined should be converted to null', () => {
            assert.equal(urlType.cast(undefined), null);
        });
        it('empty value should be converted to null', () => {
            assert.equal(urlType.cast(' '), null);
        });
        it('non url value should be converted to null', () => {
            assert.equal(urlType.cast('test'), null);
        });
        it('numeric value should be converted to null', () => {
            assert.equal(urlType.cast(5), null);
        });
        it('boolean value should be converted to null', () => {
            assert.equal(urlType.cast(true), null);
        });
        it('id property of object should be fetched as value', () => {
            assert.equal(urlType.cast({id:'http://j.mp'}), 'http://j.mp');
        });
        it('first item of array should be fetched as value', () => {
            assert.equal(urlType.cast(['http://j.mp']), 'http://j.mp');
        });
        it('return of function should be fetched as value', () => {
            assert.equal(urlType.cast(() => 'http://j.mp'), 'http://j.mp');
        });
    });
    describe('#castArray()', function () {
        it('any empty value should be fetched as []', function () {
            assert.deepEqual(urlType.castArray(null), []);
        });
        it('array of url should be converted valid url', function () {
            assert.deepEqual(urlType.castArray(given), expected);
        });
        it('empty string not in array', function () {
            assert.deepEqual(urlType.castArray(['', 'http://j.mp']), ["http://j.mp"]);
        });
        it('plain text should be first item in array', function () {
            assert.deepEqual(urlType.castArray('http://j.mp'), ['http://j.mp']);
        });
    });
});