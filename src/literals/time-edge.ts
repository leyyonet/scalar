import {fqnHandler} from "@leyyo/core";
import {FQN_PCK} from "../internal";

/**
 * Time part items
 * */
export const TimeEdgeItems = ['start-of', 'end-of'] as const;
// noinspection JSUnusedGlobalSymbols
/**
 * Time part
 * */
export type TimeEdge = typeof TimeEdgeItems[number];

fqnHandler.literal('TimeEdge', TimeEdgeItems, FQN_PCK);