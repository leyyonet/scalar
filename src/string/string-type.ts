import htmlDomParser from 'html-dom-parser';
import {Comment, Element, Text} from "domhandler";
import {ElementType} from "domelementtype";
import {NodeWithChildren} from "domhandler/lib/node";
import {CastAlias, CastAssign, FieldType, Fqn, Injectable, leyyo} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {ScalarHtmlElement, StringTypeLike} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Injectable()
@CastAlias(String)
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class StringType extends AbstractScalar<string> implements StringTypeLike {
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.STRING,
        }
    }


    cast(value: unknown): string {
        return leyyo.primitive.string(value);
    }

    // region string-line
    hasLine(str: string): boolean {
        if (typeof str !== 'string') { return false;}
        return str.search(/\r?\n/g) >= 0;
    }
    toLines(str: string): Array<string> {
        if (typeof str !== 'string') { return [];}
        return str.split(/\r?\n/);
    }
    hasEmptyLine(str: string): boolean {
        if (!this.hasLine(str)) {return false;}
        str = str
            // align line char
            .replace(/\r?\n/g, '\n')
            // align line char
            .replace(/\r/g, '\n')
        ;
        const lines = str.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (line === '') {
                return true;
            }
        }
        return false;
    }
    lineCount(str: string): number {
        if (!this.hasLine(str)) {return 0;}
        str = str
            // align line char
            .replace(/\r\n/g, '\n')
            // align line char
            .replace(/\r/g, '\n')
        ;
        return (str === '') ? 0 : str.split('\n').length;
    }
    cropLines(str: string, max: number, delimiter = '\n'): string {
        if (typeof str !== 'string') { return null;}
        return str.split(/\r?\n/).slice(0, max).join(delimiter).trim();
    }
    stripEmptyLines(str: string, delimiter = '\n'): string {
        if (!this.hasLine(str)) {return str;}
        if (!['\r\n', '\r', '\n'].includes(delimiter)) {
            delimiter = '\n';
        }
        str = str
            // align line char
            .replace(/\r\n/g, '\n')
            // align line char
            .replace(/\r/g, '\n')
        ;
        const result = [] as Array<string>;
        const lines = str.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (line !== '') {
                result.push(line);
            }
        }
        return result.join(delimiter);
    }
    // endregion string-line
    // region string-tab
    hasTab(str: string): boolean {
        if (typeof str !== 'string') { return false;}
        return str.search(/\t/g) >= 0;
    }
    removeTabs(str: string, replacement = ' '): string {
        if (!this.hasTab(str)) {return str;}
        if (typeof replacement !== 'string') {
            replacement = '';
        }
        return str.replace(/\t/g, replacement).trim();
    }
    // endregion fn-tab
    // region string-word
    wordCount(str: string): number {
        if (typeof str !== 'string') { return 0;}
        str = str
            .trim()
            // remove punctuations
            .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, '')
            // remove spaces
            .replace(/\s+/g, '-')
            // left-trim - from start of text
            .replace(/^-+/, '')
            // right-trim - from end of text
            .replace(/-+$/, '')
            // remove successive dashes
            .replace(/-+/g, '-')
        ;
        if (str === '-') {
            str = '';
        }
        return (str === '') ? 0 : str.split('-').length;
    }
    cropWords(str: string, max: number): string {
        if (typeof str !== 'string') { return null;}
        return str.split(' ').filter( n => n !== '').slice(0, max).join(' ').trim();
    }
    // endregion string-word
    // region string-html
    hasHtmlTag(str: string): boolean {
        return typeof str === 'string' && /<[a-z\d\-][\s\S]*>/i.test(str);
    }
    protected _findHtmlTags(docs: Array<ScalarHtmlElement>, tags: Array<string>): void {
        if (docs && docs.length > 0) {
            docs.forEach(item => {
                const doc = item as Element | Text;
                switch (doc.type) {
                    case ElementType.Tag:
                        if (!tags.includes((doc as Element).name)) {
                            tags.push((doc as Element).name);
                        }
                        break;
                    case ElementType.Text:
                        break;
                    case ElementType.Script:
                    case ElementType.Style:
                        if (!tags.includes(doc.type)) {
                            tags.push(doc.type);
                        }
                        break;
                    default: //Comment, Directive
                        if (!tags.includes(`###${(doc as Comment).type}###`)) {
                            tags.push(`###${(doc as Comment).type}###`);
                        }
                        break;
                }
                const withChildren = doc as NodeWithChildren;
                if (withChildren.children && withChildren.children.length) {
                    this._findHtmlTags(withChildren.children as Array<ScalarHtmlElement>, tags);
                }
            });
        }
    }
    htmlTags(input: string): Array<string> {
        const docs = htmlDomParser(input);
        const tags = [];
        if (docs && docs.length > 0) {
            this._findHtmlTags(docs, tags);
        }
        return tags;
    }

    stripHtmlTagsWithWhitelist(input: string, tags: Array<string>): string {
        tags = tags.map(tag => tag.toLowerCase());
        tags = tags.filter(tag => /[a-z][a-z\d\-]*/g.test(tag));
        const pattern = /<\/?([a-z][a-z\d|-]*)\b[^>]*>/gi;
        return leyyo.primitive.string(input.replace(pattern, ($0, $1) => tags.includes($1.toLowerCase()) ? $0 : '').trim());
    }
    stripHtmlTagsWithoutBlacklist(input: string, tags: Array<string>): string {
        tags = tags.map(tag => tag.toLowerCase());
        tags = tags.filter(tag => /[a-z][a-z\d\-]*/g.test(tag));
        const pattern = /<\/?([a-z][a-z\d|-]*)\b[^>]*>/gi;
        return leyyo.primitive.string(input.replace(pattern, ($0, $1) => tags.includes($1.toLowerCase()) ? '' : $0).trim());
    }
    stripHtmlTagsAll(value: string): string {
        return leyyo.primitive.string(value.replace(/<\/?[^>]+(>|$)/g, '').trim());
    }
    // endregion string-html
}