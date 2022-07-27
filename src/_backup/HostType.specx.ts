import * as dotenv from "dotenv";
// it's important, it must run before core
dotenv.config();
import {leyyo} from "../../../core";
leyyo.base.lyyDebug(false);

import {strict as assert} from 'assert';
import {hostType, stringType} from "../index";

// tld and subdomains
const values = {
    
}
const _add = (host, is) => {
    values[host] = is;
}
_add('example.com', true);
_add('example.com.', true); //todo
_add('foo.example.com', true);
_add('bar.foo.example.com', true);
_add('exa-mple.co.uk', true);
_add('a.com', true);
_add('.com.', false);
_add('a.b', true);
_add('foo.bar.baz', true);
_add('foo-bar.ba-z.qux', true);
_add('hello.world', true);
_add('ex-am-ple.com', true);
_add('xn--80ak6aa92e.com', true);
_add('example.a9', true);
_add('example.9a', true);
_add('example.99', false);
_add('4chan.com', true);
_add('9gag.com', true);
_add('37signals.com', true);
_add('hello.world', true);

// invalid tld and subdomains
_add('exa_mple.com', false);
_add('', false);
_add('ex*mple.com', false);
_add('@#$@#$%fd', false);
_add('_example.com', false);
_add('-example.com', false);
_add('foo._example.com', false);
_add('foo.-example.com', false);
_add('foo.example-.co.uk', false);
_add('example-.com', false);
_add('example_.com', false);
_add('foo.example-.com', false);
_add('foo.example_.com', false);
_add('example.com-', false);
_add('example.com_', false);
_add('-foo.example.com_', false);
_add('_foo.example.com_', false);
_add('*.com_', false);
_add('*.*.com_', false);

// more subdomains
_add('example.com', true);
_add('example.co.uk', true);
_add('-foo.example.com', false);
_add('foo-.example.com', false);
_add('-foo-.example.com', false);
_add('foo-.bar.example.com', false);
_add('-foo.bar.example.com', false);
_add('-foo-.bar.example.com', false);

// wildcard
_add('*.example.com', false);

// hostnames can't have underscores
_add('_dnslink.ipfs.io', true); //@todo
_add('xn--_eamop-.donata.com', false);

// punycode
_add('xn--6qq79v.xn--fiqz9s', true);
_add('xn--ber-goa.com', true);

// IPs
_add("127.0.0.1", true);
_add("100.1.2.3", true);
_add("8.8.8.8", true);
_add("127.0.0.1:3000", false);
_add("1.1.1.3com", true);

// valid labels
_add('localhost', true);
_add('example', false);
_add('exa-mple', false);
_add('bar.q-ux', false); //@todo
_add('a'.repeat(63), false);

// valid length
_add(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}`, true);
_add(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}.`, true);
_add(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(62)}`, false);

// invalid labels
_add("example.com:3000", false);
_add("localhost:3000", false);
_add('example..comw', false);
_add('a'.repeat(64), false);
_add('-exa-mple', false);
_add('-exa-mple-', false);
_add('exa-mple-', false);
_add('example-', false);
_add('.', false);
_add('..', false);
_add('example..', false);
_add('..example', false);
_add('.example', false);

// contains em-dash
_add('xn–pple-43d.com', false);

// invalid values
_add('foo.example.com*', false);
_add(`google.com"\'\"\""\\"\\'test test`, false);
_add(`google.com.au'"\'\"\""\\"\\'test`, false);
_add('...', false);
_add('.example.', false);
_add('.example.com', false);
_add('"example.com"', false);

describe('hostType', () => {
    describe('#cast()', () => {
        for (const [k, v] of Object.entries(values)) {
            if (v) {
                it(k + ' should be host', () => {
                    assert.equal(hostType.cast(k, {log: false}), stringType.cast(k));
                });
            } else {
                it(k + ' should not be host', () => {
                    assert.equal(hostType.cast(k, {log: false}), null);
                });
            }
        }
        it('undefined should be converted to null', () => {
            assert.equal(hostType.cast(undefined, {log: false}), null);
        });
        it('empty value should be converted to null', () => {
            assert.equal(hostType.cast(' ', {log: false}), null);
        });
        it('numeric value should be converted to null', () => {
            assert.equal(hostType.cast(5, {log: false}), null);
        });
        it('boolean value should be converted to null', () => {
            assert.equal(hostType.cast(true, {log: false}), null);
        });
        it('id property of object should be fetched as value', () => {
            assert.equal(hostType.cast({id:'foo.example.com'}, {log: false}), 'foo.example.com');
        });
        it('first item of array should be fetched as value', () => {
            assert.equal(hostType.cast(['foo.example.com'], {log: false}), 'foo.example.com');
        });
        it('return of function should be fetched as value', () => {
            assert.equal(hostType.cast(() => 'foo.example.com', {log: false}), 'foo.example.com');
        });
    });
});