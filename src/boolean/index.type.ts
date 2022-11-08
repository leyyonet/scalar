import {ScalarItemCast} from "../abstract";

export interface BooleanTypeLike extends ScalarItemCast<boolean> {
    isTrue(value: unknown): boolean;
    isFalse(value: unknown): boolean;
    stringify(value: boolean): string;
    toInteger(value: boolean): number;
}
