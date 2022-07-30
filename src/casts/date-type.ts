import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, castPool} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {DateCast, DateOpt, ScalarLike} from "../index-types";
import moment from "moment";
import {TimePart} from "../index-enums";
import {AbstractScalar} from "../abstract-scalar";

type _T = Date;
type _O = DateOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast()
@Bind()
export class DateType extends AbstractScalar<_T, _O> implements DateCast {
    constructor() {
        super();
        castPool.copy(this, Date);
    }
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        if (leyyo.is.empty(value)) {return false;}
        if (value instanceof Date || value instanceof moment) {
            return true;
        }
        if (!leyyo.is.key(value)) {
            return false;
        }
        return new Date(value as string).getTime() > 0;
    }

    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        return leyyo.primitive.date(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'string', format: 'date-time'};
    }
    ly_validate<T = _T>(value: T, opt: _O): T {
        return value;
    }
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: DateOpt): CastApiDocResponse {
        return {type: 'string', format: 'date-time'};
    }
    addTime(part: TimePart, size: number, date?: unknown): Date {
        if (!(date instanceof Date)) {
            date = new Date(date as string);
        }
        const time = date as Date;
        switch (part) {
            case TimePart.YEAR:
                time.setUTCFullYear(time.getUTCFullYear() + size);
                return time;
            case TimePart.MONTH:
                time.setUTCMonth(time.getUTCMonth() + size);
                return time;
            case TimePart.DAY:
                time.setUTCDate(time.getUTCDate() + size);
                return time;
            case TimePart.HOUR:
                time.setUTCHours(time.getUTCHours() + size);
                return time;
            case TimePart.MINUTE:
                time.setUTCMinutes(time.getUTCMinutes() + size);
                return time;
            case TimePart.SECOND:
                time.setUTCSeconds(time.getUTCSeconds() + size);
                return time;
            case TimePart.MSEC:
                time.setTime(time.getTime() + size);
                return time;
            case TimePart.WEEK:
                time.setUTCDate(time.getUTCDate() + size * 7);
                return time;
            case TimePart.QUARTER:
                time.setUTCMonth(time.getUTCMonth() + size * 3);
                return time;
            case TimePart.HALF:
                time.setUTCMonth(time.getUTCMonth() + size * 6);
                return time;
        }
        return time;
    }
    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean {
        if (!(value instanceof Date)) {
            return false;
        }
        const after = this.addTime(part, size, date);
        return after.getTime() > (value as Date).getTime();
    }
    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean {
        if (!(value instanceof Date)) {
            return false;
        }
        const before = this.addTime(part, size, date);
        return before.getTime() < (value as Date).getTime();
    }

}
export const dateType = new DateType();