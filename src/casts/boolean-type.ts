import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, castPool} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {BooleanAlias, BooleanCast, BooleanOpt, ScalarLike} from "../index-types";
import {AbstractScalar} from "../abstract-scalar";

type _T = BooleanAlias;
type _O = BooleanOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Bool')
@Bind()
export class BooleanType extends AbstractScalar<_T, _O> implements BooleanCast {
    constructor(scalar: ScalarLike) {
        super(scalar);
        castPool.copy(this, Boolean);
    }

    is(value: unknown, opt?: _O): boolean {
        if (typeof value === 'boolean') {
            return true;
        }
        if (opt?.strict) {
            return false;
        }
        if (leyyo.is.number(value)) {
            return true;
        }
        if (!leyyo.is.text(value)) {
            return false;
        }
        const text = (value as string).toLowerCase();
        return leyyo.primitive.BOOL_TRUE.includes(text) || leyyo.primitive.BOOL_FALSE.includes(text);
    }
    cast(value: unknown, opt?: _O): _T {
        return leyyo.primitive.boolean(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'boolean'};
    }

    isTrue(value: unknown): boolean {
        return (value === true) || (leyyo.is.text(value) && leyyo.primitive.BOOL_TRUE.includes((value as string).toLowerCase())) || (leyyo.is.number(value) && value > 0);
    }
    isFalse(value: unknown): boolean {
        return (value === false) || (leyyo.is.text(value) && leyyo.primitive.BOOL_FALSE.includes((value as string).toLowerCase())) || (leyyo.is.number(value) && value <= 0);
    }
    stringify(value: BooleanAlias): string {
        if (value === true) {return 'true';}
        if (value === false) {return 'false';}
        return null;
    }
    toInteger(value: BooleanAlias): number {
        if (value === true) {return 1;}
        if (value === false) {return 0;}
        return null;
    }

}