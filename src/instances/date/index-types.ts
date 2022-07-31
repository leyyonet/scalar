import {RecLike, TypeOpt} from "@leyyo/core";
import {CastApiDocResponse} from "@leyyo/cast";
import {ScalarItemCast} from "../abstract";

export type DateAlias = Date;
export type DateOpt = TypeOpt;
export interface DateCast extends ScalarItemCast<DateAlias, DateOpt> {
    ly_validate<T = DateAlias>(value: T, opt: DateOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: DateOpt): CastApiDocResponse;
    addTime(part: TimePart, size: number, date?: unknown): DateAlias;
    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean;
    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean;
}
export enum TimePart {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
    HOUR = 'hour',
    MINUTE = 'minute',
    SECOND = 'second',
    MSEC = 'msec',

    WEEK = 'week',
    QUARTER = 'quarter',
    HALF = 'half',
}