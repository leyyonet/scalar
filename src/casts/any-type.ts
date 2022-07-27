import {Bind, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../internal-component";
import {AnyAlias, AnyCast, AnyOpt} from "../index-types";
import {AbstractScalar} from "../abstract-scalar";

type _T = AnyAlias;
type _O = AnyOpt;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Any', 'Unknown', 'Mixed')
@Bind()
export class AnyType extends AbstractScalar<_T, _O> implements AnyCast {
    is(value: unknown, opt?: _O): boolean {
        return leyyo.is.value(value);
    }
    cast(value: unknown, opt?: _O): _T {
        return leyyo.primitive.any(value, opt);
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: _O): CastApiDocResponse {
        return {$ref: 'Any'};
    }
}