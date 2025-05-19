import {fqnHandler} from "@leyyo/core";
import {FQN_PCK} from "../internal";

/**
 * Time part items
 * */
export const TrimTypeItems = ['both', 'start', 'end'] as const;
// noinspection JSUnusedGlobalSymbols
/**
 * Time part
 * */
export type TrimType = typeof TrimTypeItems[number];

fqnHandler.literal('TrimType', TrimTypeItems, FQN_PCK);