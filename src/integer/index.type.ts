import {ScalarItemCast} from "../abstract";

export interface IntegerTypeLike extends ScalarItemCast<number> {
    inRange(value: unknown, min: number, max: number): boolean;
    isDividedBy(value: unknown, division: number): boolean;
}
