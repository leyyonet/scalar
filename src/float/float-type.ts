// noinspection JSUnusedGlobalSymbols

import {CastAlias, CastAssign, FieldType, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {FloatTypeLike} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Injectable()
@Nickname('Float', 'Double')
@CastAlias(Number)
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class FloatType extends AbstractScalar<number> implements FloatTypeLike {
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.NUMBER,
        }
    }
    cast(value: unknown): number {
        return leyyo.primitive.float(value);
    }

    inRange(value: unknown, min: number, max: number): boolean {
        const num = leyyo.primitive.float(value);
        if (num === null) {
            return false;
        }
        min = leyyo.primitive.float(min);
        if (min === null) {
            return false;
        }
        if (num < min) {
            return false;
        }
        max = leyyo.primitive.float(max);
        if (max === null) {
            return false;
        }
        return (num <= max);
    }
}
