import {RecLike, TypeOpt} from "@leyyo/core";
import {CastApiDocResponse} from "@leyyo/cast";
import {ScalarItemCast, ScalarRangeOpt, ScalarStripActOpt} from "../abstract";

export interface StringLinesOpt extends ScalarRangeOpt {
    ifEmpty?: ScalarStripActOpt;
}
export interface StringTabOpt extends RecLike {
    act?: ScalarStripActOpt|'replace';
    replacement?: string;
}
export interface StringHtmlOpt extends RecLike {
    act?: ScalarStripActOpt;
    tags?: true|Array<string>;
}

export type StringAlias = string;
export interface StringOpt extends TypeOpt {
    def?: string;
    required?: boolean;
    length?: ScalarRangeOpt;
    lines?: StringLinesOpt;
    words?: ScalarRangeOpt;
    tab?: StringTabOpt;
    html?: StringHtmlOpt;
}
export interface StringCast extends ScalarItemCast<StringAlias, StringOpt> {
    // region string-line
    hasLine(str: string): boolean;
    hasEmptyLine(str: string): boolean;
    lineCount(str: string): number;
    cropLines(str: string, max: number, delimiter?: string): string;
    stripEmptyLines(str: string, delimiter?: string): string;
    // endregion string-line
    // region string-tab
    hasTab(str: string): boolean;
    removeTabs(str: string, replacement?: string): string;
    // endregion fn-tab
    // region string-word
    wordCount(str: string): number;
    cropWords(str: string, max: number): string;
    // endregion string-word
    // region string-html
    hasHtmlTag(str: string): boolean;
    stripTags(input: string, allowed: Array<string>): string;
    stripTagsAll(value: string): string;
    // endregion string-html
    ly_validate<T = StringAlias>(value: T, opt: StringOpt): T;
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: StringOpt): CastApiDocResponse;
}
