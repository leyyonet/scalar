// noinspection JSUnusedGlobalSymbols

import {CastAssign, FieldType, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {IntegerTypeLike} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Injectable()
@Nickname('Integer', 'Int')
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class IntegerType extends AbstractScalar<number> implements IntegerTypeLike {
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.INTEGER,
        }
    }
    cast(value: unknown): number {
        return leyyo.primitive.integer(value);
    }
    inRange(value: unknown, min: number, max: number): boolean {
        const num = leyyo.primitive.integer(value);
        if (num === null) {
            return false;
        }
        min = leyyo.primitive.integer(min);
        if (min === null) {
            return false;
        }
        if (num < min) {
            return false;
        }
        max = leyyo.primitive.integer(max);
        if (max === null) {
            return false;
        }
        return (num <= max);
    }
    isDividedBy(value: unknown, division: number): boolean {
        if (leyyo.primitive.isEmpty(value) || leyyo.primitive.isEmpty(division)) {
            return false;
        }
        const num = leyyo.primitive.integer(value);
        if (num === null || num === 0) {
            return false;
        }
        division = leyyo.primitive.integer(division);
        if (division === null || division === 0) {
            return false;
        }
        return (num % division) === 0;
    }

}
