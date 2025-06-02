import {fqnHandler} from "@leyyo/core";
import {FQN} from "../internal";

/**
 * Time present items
 * */
export const TimePresentItems = ['year',
    'month', 'month-of-quarter',
    'day', 'day-of-month', 'day-of-week', 'day-of-year',
    'hour', 'minute', 'second', 'millisecond',
    'week', 'week-of-month',
    'quarter'] as const;
// noinspection JSUnusedGlobalSymbols
export type TimePresent = typeof TimePresentItems[number];
fqnHandler.literal('TimePresent', TimePresentItems, FQN);
