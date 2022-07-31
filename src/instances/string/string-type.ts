import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, castPool} from "@leyyo/cast";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar} from "../abstract";
import {StringAlias, StringCast, StringOpt} from "./index-types";

type _T = StringAlias;
type _O = StringOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast()
@Bind()
export class StringType extends AbstractScalar<_T, _O> implements StringCast {
    constructor() {
        super();
        castPool.copy(this, String);
    }
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.string(value);
    }
    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        return leyyo.primitive.string(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'string'};
    }

    // region string-line
    hasLine(str: string): boolean {
        if (typeof str !== 'string') { return false;}
        return str.search(/\r\n/g) >= 0;
    }
    hasEmptyLine(str: string): boolean {
        if (!this.hasLine(str)) {return false;}
        str = str
            // align line char
            .replace(/\r\n/g, '\n')
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
        return null;
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
        return null;
    }
    // endregion string-word
    // region string-html
    hasHtmlTag(str: string): boolean {
        return typeof str === 'string' && /<[a-z\d\-][\s\S]*>/i.test(str);
    }
    stripTags(input: string, allowed: Array<string>): string {
        allowed = allowed.map(tag => tag.toLowerCase());
        allowed = allowed.filter(tag => /[a-z][a-z\d\-]*/g.test(tag));
        const pattern = /<\/?([a-z][a-z\d|-]*)\b[^>]*>/gi;
        return leyyo.primitive.string(input.replace(pattern, ($0, $1) => allowed.includes($1.toLowerCase()) ? $0 : '').trim());
    }
    stripTagsAll(value: string): string {
        return leyyo.primitive.string(value.replace(/<\/?[^>]+(>|$)/g, '').trim());
    }
    // endregion string-html
    ly_validate<T = _T>(value: T, opt: _O): T {
        return value;
    }
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'string'};
    }

}
export const stringType = new StringType();