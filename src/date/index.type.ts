import {ScalarItemCast} from "../abstract";
import {TimePart} from "./index.enum";

export interface DateTypeLike extends ScalarItemCast<Date> {
    addTime(part: TimePart, size: number, date?: unknown): Date;
    is(value: unknown): boolean;
    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean;
    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean;
}
