import {TypeOpt} from "@leyyo/core";
import {ScalarItemCast} from "../abstract";

export type AnyAlias = unknown;
export type AnyOpt = TypeOpt;
export type AnyCast = ScalarItemCast<AnyAlias, AnyOpt>;
