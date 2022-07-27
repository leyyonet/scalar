import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import { strict as assert } from 'assert';
import {hashType} from "./type";

describe('hashType', () => {
    describe('#cast()', () => {
        it('[if input is undefined] undefined should be converted to {}', () => {
            assert.deepEqual(hashType.cast(undefined), {});
        });
        it('Valid object with excluding nulls', () => {
            assert.deepEqual(hashType.cast({a:1,b:"test",c:false,d:[1,2],e:null,f:{f1:true}}), {a:1,b:"test",c:false,d:[1,2],f:{f1:true}});
        });
        it('Valid object with nulls', () => {
            assert.deepEqual(hashType.cast({a:1,b:"test",c:false,d:[1,2],e:null,f:{f1:true}}, {keepNullValues:true}), {a:1,b:"test",c:false,d:[1,2],e:null,f:{f1:true}});
        });
        it('Valid object and child array with nulls', () => {
            assert.deepEqual(hashType.cast({a:1,b:"test",c:false,d:[1,2,null],e:null,f:{f1:true}}, {keepNullValues:true,keepNullItems:true}), {a:1,b:"test",c:false,d:[1,2,null],e:null,f:{f1:true}});
        });
        it('functions to object', () => {
            assert.deepEqual(hashType.cast(() => {return {a:1,b:"test",c:false,d:[1,2],e:null,f:{f1:true}};}, {keepNullValues:true}), {a:1,b:"test",c:false,d:[1,2],e:null,f:{f1:true}});
        });
    });
});