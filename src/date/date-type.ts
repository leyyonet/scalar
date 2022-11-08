import moment from "moment";
import {CastAlias, CastAssign, FieldType, Fqn, Injectable, leyyo} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {DateTypeLike} from "./index.type";
import {LY_INT_FQN} from "../internal";
import {TimePart} from "./index.enum";

@Injectable()
@CastAlias(Date)
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class DateType extends AbstractScalar<Date> implements DateTypeLike {
    constructor() {
        super();
        leyyo.enum.add('TimePart', TimePart, ...LY_INT_FQN);
        this._castDoc = {
            type: FieldType.STRING,
            format: 'date-time',
        }
    }


    cast(value: unknown): Date {
        return leyyo.primitive.date(value);
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
    is(value: unknown): boolean {
        if (leyyo.primitive.isEmpty(value)) {
            return false;
        }
        if (value instanceof Date || value instanceof moment) {
            return true;
        }
        if (!leyyo.primitive.isText(value) && !leyyo.primitive.isInteger(value)) {
            return false;
        }
        return new Date(value as string).getTime() > 0;
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