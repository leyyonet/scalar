import {Bind, Fqn} from "@leyyo/fqn";
import {FuncLike, leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse, castPool} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {ArrayOpt, FuncCast, FuncOpt, ObjectOpt, ScalarLike} from "../index-types";
import {AbstractScalar} from "../abstract-scalar";

type _O = FuncOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Lambda', 'Method', 'Callable', 'Func')
@Bind()
export class FunctionType extends AbstractScalar<FuncLike, _O> implements FuncCast {
    constructor(scalar: ScalarLike) {
        super(scalar);
        castPool.copy(this, Function);
    }

    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.func(value);
    }

    cast<T = FuncLike>(value: unknown, opt?: _O): T {
        return leyyo.primitive.func(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return undefined;
    }
    ly_validate(value: FuncLike, opt: _O): FuncLike {
        return value;
    }
    ly_apiDoc(target: unknown, property: PropertyKey, openApi: RecLike, extra: RecLike, opt?: _O): CastApiDocResponse {
        return {type: 'string', format: 'date-time'};
    }

}
