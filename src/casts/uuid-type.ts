// noinspection JSUnusedGlobalSymbols

import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {DeveloperException, leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {UuidAlias, UuidCast, UuidOpt} from "../index-types";
import * as uuid from 'uuid';
import {AbstractScalar} from "../abstract-scalar";

type _T = UuidAlias;
type _O = UuidOpt;

@Fqn(...FQN_NAME)
@AssignCast('Uuid')
@Bind()
export class UuidType extends AbstractScalar<_T, _O> implements UuidCast {
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        if (leyyo.is.empty(value)) {return false;}
        return typeof value === 'string' && uuid.validate(value);
    }
    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        const text = leyyo.primitive.text(value, opt);
        if (text && !uuid.validate(text)) {
            new DeveloperException('scalar.invalid-uuid', {field: opt?.field}).with(this).raise(!opt?.silent);
        }
        return AbstractScalar.SCALAR.string.ly_validate(text, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return AbstractScalar.SCALAR.string.ly_apiDoc(target, property, openApi, {}, opt);
    }
    /**
     * Generated uuid by version
     * */
    generate(version?: string|number): _T {
        let verStr: string;
        switch (typeof version) {
            case "number":
                verStr = 'v' + version.toString(10);
                break;
            case "string":
                verStr = version.trim();
                break;
            default:
                verStr = 'v4';
                break;
        }
        if (typeof uuid[version] !== 'function') {
            version = 'v4';
        }
        return uuid[version]();
    }
    /**
     * Generated empty uuid
     * */
    empty(): _T {
        return uuid.NIL;
    }
}
export const uuidType = new UuidType();
export {uuid};