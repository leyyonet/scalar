// noinspection JSUnusedGlobalSymbols

import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, castPool} from "@leyyo/cast";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar} from "../../abstract";
import {FloatAlias, FloatCast, FloatOpt} from "./index-types";

type _T = FloatAlias;
type _O = FloatOpt;

// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Float', 'Double')
@Bind()
export class FloatType extends AbstractScalar<_T, _O> implements FloatCast {
    constructor() {
        super();
        castPool.copy(this, Number);
    }
    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.float(value);
    }
    @memoize({})
    cast(value: unknown, opt?: _O): _T {
        return this.ly_validate(leyyo.primitive.float(value, opt), opt);
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
    isDivisibleBy(value: unknown, num: number): boolean {
        if (leyyo.is.empty(value)) {return false;}
        num = leyyo.primitive.float(num);
        if (num === null) {
            return false;
        }
        // @todo
        return true;
    }
    inRange(value: number, min: number, max: number): boolean {
        value = leyyo.primitive.float(value);
        if (value === null) {
            return false;
        }
        min = leyyo.primitive.float(min);
        if (min === null) {
            return false;
        }
        if (value < min) {
            return false;
        }
        max = leyyo.primitive.float(max);
        if (max === null) {
            return false;
        }
        return (value <= max);
    }
}
export const floatType = new FloatType();
export const doubleType = floatType;
export const numberType = floatType;
