import {Moment} from "moment";
import {$is} from "@leyyo/common";
import {Fqn} from "@leyyo/core";
import {
    DateUtilsLike,
    ScalarEqualityDate,
    ScalarEqualityDateResult,
    TimeAmountTuple,
    TimeEdgeTuple
} from "./index.types";
import {FQN} from "../internal";
import {TimePart, TimePartItems, TimePresent} from "../literals";

@Fqn(FQN)
class DateUtils implements DateUtilsLike {
    addTime(part: TimePart, size: number, date?: unknown): Date {
        if ( !(date instanceof Date)) {
            date = new Date(date as string);
        }
        const time = date as Date;
        switch (part) {
            case 'year':
                time.setUTCFullYear(time.getUTCFullYear() + size);
                return time;
            case 'month':
                time.setUTCMonth(time.getUTCMonth() + size);
                return time;
            case 'day':
                time.setUTCDate(time.getUTCDate() + size);
                return time;
            case 'hour':
                time.setUTCHours(time.getUTCHours() + size);
                return time;
            case 'minute':
                time.setUTCMinutes(time.getUTCMinutes() + size);
                return time;
            case 'second':
                time.setUTCSeconds(time.getUTCSeconds() + size);
                return time;
            case 'millisecond':
                time.setTime(time.getTime() + size);
                return time;
            case 'week':
                time.setUTCDate(time.getUTCDate() + size * 7);
                return time;
            case 'quarter':
                time.setUTCMonth(time.getUTCMonth() + size * 3);
                return time;
            default:
                return time;
        }
    }

    isAfter(value: unknown, part: TimePart, size: number, date?: string): boolean {
        if ( !(value instanceof Date)) {
            return false;
        }
        const after = this.addTime(part, size, date);
        return after.getTime() > (value as Date).getTime();
    }

    isBefore(value: unknown, part: TimePart, size: number, date?: string): boolean {
        if ( !(value instanceof Date)) {
            return false;
        }
        const before = this.addTime(part, size, date);
        return before.getTime() < (value as Date).getTime();
    }

    execSubEquality(equality: ScalarEqualityDate, part: number): ScalarEqualityDateResult {
        if ( !$is.object(equality)) {
            return {reason: 'invalid equality', equality: null, comparison: []};
        }
        if (equality.equals !== undefined) {
            if ( !Number.isInteger(equality.equals)) {
                return {reason: 'invalid value', equality: 'equals', comparison: [equality.equals]};
            }
            return {success: part === equality.equals, equality: 'equals', comparison: [equality.equals]};
        }
        else if (equality.not !== undefined) {
            if ( !Number.isInteger(equality.not)) {
                return {reason: 'invalid value', equality: 'not', comparison: [equality.not]};
            }
            return {success: part !== equality.not, equality: 'not', comparison: [equality.not]};
        }
        else if (equality.greaterThan !== undefined) {
            if ( !Number.isInteger(equality.greaterThan)) {
                return {reason: 'invalid value', equality: 'greaterThan', comparison: [equality.greaterThan]};
            }
            return {success: part > equality.greaterThan, equality: 'greaterThan', comparison: [equality.greaterThan]};
        }
        else if (equality.lessThan !== undefined) {
            if ( !Number.isInteger(equality.lessThan)) {
                return {reason: 'invalid value', equality: 'lessThan', comparison: [equality.lessThan]};
            }
            return {success: part < equality.lessThan, equality: 'lessThan', comparison: [equality.lessThan]};
        }
        else if (equality.in !== undefined) {
            if ( !Array.isArray(equality.in)) {
                return {reason: 'invalid in array', equality: 'in', comparison: equality.in ?? []};
            }
            if ( !equality.in.every(v => Number.isInteger(v))) {
                return {reason: 'invalid in items', equality: 'in', comparison: equality.in};
            }
            return {success: equality.in.includes(part), equality: 'in', comparison: equality.in};
        }
        else if (equality.notIn !== undefined) {
            if ( !Array.isArray(equality.notIn)) {
                return {reason: 'invalid notIn array', equality: 'notIn', comparison: equality.notIn ?? []};
            }
            if ( !equality.notIn.every(v => Number.isInteger(v))) {
                return {reason: 'invalid notIn items', equality: 'notIn', comparison: equality.notIn};
            }
            return {success: !equality.notIn.includes(part), equality: 'notIn', comparison: equality.notIn};
        }
        else if (equality.between !== undefined) {
            if ( !Array.isArray(equality.between) || equality.between.length !== 2) {
                return {reason: 'invalid between array', equality: 'between', comparison: equality.between ?? []};
            }
            if ( !equality.between.every(v => Number.isInteger(v))) {
                return {reason: 'invalid between items', equality: 'between', comparison: equality.between};
            }
            return {
                success: part >= equality.between[0] && part <= equality.between[1],
                equality: 'between',
                comparison: equality.between
            };
        }
        else if (equality.notBetween !== undefined) {
            if ( !Array.isArray(equality.notBetween) || equality.notBetween.length !== 2) {
                return {
                    reason: 'invalid notBetween array',
                    equality: 'notBetween',
                    comparison: equality.notBetween ?? []
                };
            }
            if ( !equality.notBetween.every(v => Number.isInteger(v))) {
                return {reason: 'invalid notBetween items', equality: 'notBetween', comparison: equality.notBetween};
            }
            return {
                success: part < equality.notBetween[0] || part > equality.notBetween[1],
                equality: 'notBetween',
                comparison: equality.notBetween
            };
        }
        return {reason: 'invalid equality', equality: null, comparison: []};
    }

    readPartByPresent(present: TimePresent, mom: Moment): number {
        switch (present) {
            case 'year':
            case 'month':
            case 'hour':
            case 'minute':
            case 'second':
            case 'millisecond':
            case 'quarter':
            case 'week':
                return mom[present]();
            case "day":
            case "day-of-month":
                return mom.date();
            case "month-of-quarter":
                const month = mom.month() % 3;
                return month === 0 ? 3 : month;
            case "day-of-week":
                return mom.day();
            case "day-of-year":
                return mom.dayOfYear();
            case "week-of-month":
                return Math.ceil(mom.date() / 7);
            default:
                return 0;
        }
    }

    runAmount(amount: TimeAmountTuple, mom: Moment, multiplier: 1 | -1): void {
        if (Array.isArray(amount) && Number.isInteger(amount[0]) && amount[0] !== 0) {
            if ( !TimePartItems.includes(amount[1])) {
                amount[1] = 'millisecond';
            }
            mom.add(amount[0] * multiplier, amount[1]);
        }
    }

    runEdge(edge: TimeEdgeTuple, mom: Moment): void {
        if (edge) {
            if (edge[0] === 'start-of') {
                mom.startOf(edge[1]);
            }
            else {
                mom.endOf(edge[1]);
            }
        }
    }
}

export const dateUtils: DateUtilsLike = new DateUtils();
