import {CastBasic, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";
import {BufferExport} from "../utils";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@Bind('static')
export class BufferType {
    static readonly priority = {
        instance: [[Buffer, 1], [Int8Array, 2]],
        array: 5,
        string: 5,
        object: 5,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
        return value && (
            value instanceof Buffer ||
            value instanceof Int8Array ||
            Array.isArray(value) ||
            typeof value === 'string' ||
            ((value as BufferExport)?.type === 'Buffer')
        );
    }
    static exact(value: unknown): boolean {
        return value instanceof Buffer;
    }

    static cast(value: unknown): Buffer {
        if ($is.empty(value)) {
            return null;
        }
        if (value instanceof Buffer) {
            return value;
        }
        switch (typeof value) {
            case "string":
                return Buffer.from(value, 'utf-8');
            case "object":
                if (value instanceof Int8Array) {
                    return Buffer.from(value)
                }
                if (Array.isArray(value)) {
                    return Buffer.from(value)
                }
                else {
                    const exported = value as BufferExport;
                    // buffer.toJSON() ==> { type: 'Buffer',data: [ 84, 101 ] }
                    if (exported.type === 'Buffer') {
                        return Buffer.from(exported.data)
                    }
                }
                break;
        }
        return $to.$secure.$unexpectedError(value, ['string', 'object', 'array']);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'string', format: 'buffer'});
    }

    static {
        castHub.pending.addClone(BufferType, Buffer);
    }
}
