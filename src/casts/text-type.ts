// noinspection JSUnusedGlobalSymbols

import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {TextAlias, TextCast, TextOpt} from "../index-types";
import {AbstractScalar} from "../abstract-scalar";

type _T = TextAlias;
type _O = TextOpt;

@Fqn(...FQN_NAME)
@AssignCast('Text')
@Bind()
export class TextType extends AbstractScalar<_T, _O> implements TextCast {
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.text(value);
    }
    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        return AbstractScalar.SCALAR.string.ly_validate(leyyo.primitive.text(value, opt), opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return AbstractScalar.SCALAR.string.ly_apiDoc(target, property, openApi, {}, opt);
    }
}
export const textType = new TextType();