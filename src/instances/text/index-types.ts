import {StringOpt} from "../string";
import {ScalarItemCast} from "../abstract";

export type TextAlias = string;
export type TextOpt = StringOpt;
export type TextCast = ScalarItemCast<TextAlias, TextOpt>;
