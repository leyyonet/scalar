import {NumberUtilsLike} from "./index.types";
import {Fqn} from "@leyyo/core";
import {FQN} from "../internal";

@Fqn(FQN)
class NumberUtils implements NumberUtilsLike {
    isDivisibleBy(value: number, num: number): boolean {
        if (typeof value !== 'number' || typeof num !== 'number') {
            return false;
        }
        return value % num === 0;
    }

    // CropMin, CropMax
    inRangeInt(value: number, min: number, max: number): boolean {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            return false;
        }
        if ( !Number.isInteger(value)) {
            value = Math.round(value);
        }
        if ( !Number.isInteger(min)) {
            min = Math.round(min);
        }
        if ( !Number.isInteger(max)) {
            max = Math.round(max);
        }
        return (value >= min) && (value <= max);
    }

    inRange(value: number, min: number, max: number): boolean {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            return false;
        }
        return (value >= min) && (value <= max);
    }
}

export const numberUtils: NumberUtilsLike = new NumberUtils();
