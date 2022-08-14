// noinspection JSUnusedGlobalSymbols

import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar} from "../../abstract";
import {IntegerAlias, IntegerCast, IntegerOpt} from "./index-types";

type _T = IntegerAlias;
type _O = IntegerOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Integer', 'Int')
@Bind()
export class IntegerType extends AbstractScalar<_T, _O> implements IntegerCast {
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.integer(value);
    }
    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        return this.ly_validate(leyyo.primitive.integer(value, opt), opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return this.ly_apiDoc(target, property, openApi, {}, opt);
    }
    ly_validate<T = _T>(value: T, opt: _O): T {
        return value;
    }
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'number'};
    }
    inRange(value: number, min: number, max: number): boolean {
        value = leyyo.primitive.integer(value);
        if (value === null) {
            return false;
        }
        min = leyyo.primitive.integer(min);
        if (min === null) {
            return false;
        }
        if (value < min) {
            return false;
        }
        max = leyyo.primitive.integer(max);
        if (max === null) {
            return false;
        }
        return (value <= max);
    }

}
export const integerType = new IntegerType();
export const intType = integerType;
