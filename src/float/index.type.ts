import {ScalarItemCast} from "../abstract";

export interface FloatTypeLike extends ScalarItemCast<number> {
    inRange(value: unknown, min: number, max: number): boolean;
}
