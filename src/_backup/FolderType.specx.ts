import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import {strict as assert} from 'assert';
import {folderType, stringType} from "../index";

const pathsLinux = [
    '/home/user/Documents/foo.log',
    '/foo.bar',
    '/~',
    '/foo',
    '/.git',
    '/dir/',
    '/absolute/sub-dir/',
    '/absolute/file/path',
];
const notLinux = [
    null,
    true,
    false,
    {},
    [],
    //'/some/\0',
    //'/foo/\b',
    '/back\\slash',
    '',
    '~',
    'not/absolute',
    'not/./normalized',
    'C:\\windows\\path',
    '/path/with/:colon',
    //'/home/user/Documents/foo.log was written', //@todo
    //'/the file /home/user/Documents/foo.log was written', //@todo
    '/path/../to/file', // path.isAbsolute(str) fails this
    '/quick/../../escape/to.file',  // path.isAbsolute(str) fails this
    '/.',  // path.isAbsolute(str) fails this
    '/..',  // path.isAbsolute(str) fails this
    '..',
    '.',
    '!path',
    '*pattern.file',
    'file*',
    // '/path/to/pattern*', //@todo
    'path/**',
    '\\\\\\server\\share',
];

const pathsWindows = [
    'C:\\home\\user\\Documents\\foo.log',
    'D:\\foo.bar',
    'D:\\~',
    'C:\\foo',
    'C:\\.git',
    'C:\\dir\\',
    'C:\\absolute\\sub-dir\\',
    'C:\\absolute\\file\\path',
];
const notWindows = [
    null,
    true,
    false,
    {},
    [],
    'C:\\some/\0',
    'C:\\/foo/\b',
    'C:\\forward/slash',
    'C:\\more\\than\\:one\\colon',
    '',
    '~',
    'not\\absolute',
    'not\\.\\normalized',
    '\\home\\with\\spaces\\foo.log was written',
    '.',
    '..',
    '\\..',
    '\\.',
    '!path',
    '*pattern.file',
    'file*',
    '\\path\\to\\pattern*',
    'path\\**',
    '\\\\\\server\\share',
];


describe('hostType', () => {
    describe('#cast()', () => {
        pathsLinux.forEach(path => {
            it(path + ' should be linux path', () => {
                assert.equal(folderType.cast(path, {log: false, isAbsolute: true}), stringType.cast(path));
            });
        })
        pathsWindows.forEach(path => {
            it(path + ' should be windows path', () => {
                assert.equal(folderType.cast(path, {log: false, isAbsolute: true, isWindows: true}), stringType.cast(path));
            });
        })
        notLinux.forEach(path => {
            it(path + ' should not be linux path', () => {
                assert.equal(folderType.cast(path, {log: false, isAbsolute: true}), null);
            });
        })
        notWindows.forEach(path => {
            it(path + ' should not be windows path', () => {
                assert.equal(folderType.cast(path, {log: false, isAbsolute: true, isWindows: true}), null);
            });
        })

        it('undefined should be converted to null', () => {
            assert.equal(folderType.cast(undefined, {log: false}), null);
        });
        it('empty value should be converted to null', () => {
            assert.equal(folderType.cast(' ', {log: false}), null);
        });
        it('id property of object should be fetched as value', () => {
            assert.equal(folderType.cast({id:'/foo.bar'}, {log: false}), '/foo.bar');
        });
        it('first item of array should be fetched as value', () => {
            assert.equal(folderType.cast(['/foo.bar'], {log: false}), '/foo.bar');
        });
        it('return of function should be fetched as value', () => {
            assert.equal(folderType.cast(() => '/foo.bar', {log: false}), '/foo.bar');
        });
    });
});