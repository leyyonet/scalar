import {fqnHandler} from "@leyyo/core";
import {FQN} from "../internal";

/**
 * Time part items
 * */
export const TimePartItems = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'week', 'quarter'] as const;
// noinspection JSUnusedGlobalSymbols
/**
 * Time part
 * */
export type TimePart = typeof TimePartItems[number];
fqnHandler.literal('TimePart', TimePartItems, FQN);
