import {TypeOpt} from "@leyyo/core";
import {ScalarItemCast} from "../abstract";

export type UuidAlias = string;
export type UuidOpt = TypeOpt;
export type UuidCast = ScalarItemCast<UuidAlias, UuidOpt>;
