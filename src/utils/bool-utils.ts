import {WeakFalse, WeakFalseItems, WeakTrue, WeakTrueItems} from "@leyyo/common";
import {BoolUtilsLike} from "./index-type";
import {Fqn} from "@leyyo/core";
import {FQN_PCK} from "../internal";

@Fqn(FQN_PCK)
class BoolUtils implements BoolUtilsLike {

    get falseItems(): Array<WeakFalse> {
        return WeakFalseItems as unknown as Array<WeakFalse>;
    }

    get trueItems(): Array<WeakTrue> {
        return WeakTrueItems as unknown as Array<WeakTrue>;
    }

    isTrue(value: unknown): boolean {
        return (value === true) || WeakTrueItems.includes(value as WeakTrue) || (typeof value === 'number' && value > 0);
    }

    isFalse(value: unknown): boolean {
        return (value === false) || WeakFalseItems.includes(value as WeakFalse) || (typeof value === 'number' && value <= 0);
    }

    asString(value: boolean): string {
        if (value === true) {
            return 'true';
        }
        if (value === false) {
            return 'false';
        }
        return null;
    }

    asInteger(value: boolean): number {
        if (value === true) {
            return 1;
        }
        if (value === false) {
            return 0;
        }
        return null;
    }
}

export const boolUtils: BoolUtilsLike = new BoolUtils();