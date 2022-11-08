import {ScalarItemCast} from "../abstract";
import {Comment, Element, ProcessingInstruction, Text} from "domhandler";

export type ScalarHtmlElement = Comment | Element | ProcessingInstruction | Text | ChildNode;

export interface StringTypeLike extends ScalarItemCast<string> {
    // region string-line
    hasLine(str: string): boolean;

    toLines(str: string): Array<string>;

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

    htmlTags(input: string): Array<string>;

    stripHtmlTagsWithWhitelist(input: string, whitelist: Array<string>): string;

    stripHtmlTagsWithoutBlacklist(input: string, blacklist: Array<string>): string;

    stripHtmlTagsAll(value: string): string;

    // endregion string-html
}
