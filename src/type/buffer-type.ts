import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";
import {BufferExport} from "../utils";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType()
@Bind('static')
export class BufferType {
    static readonly priority = {
        instance: [[Buffer, 1], [Int8Array, 2]],
        array: 5,
        string: 5,
        object: 5,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        return value && (
            value instanceof Buffer ||
            value instanceof Int8Array ||
            Array.isArray(value) ||
            typeof value === 'string' ||
            ((value as BufferExport)?.type === 'Buffer')
        );
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
                } else {
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

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string', format: 'buffer'};
    }
}

castPool.copy(BufferType, Buffer);
