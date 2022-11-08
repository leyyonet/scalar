import {CastAssign, CastOption, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {AnyTypeLike} from "./index.type";
import {LY_INT_FQN} from "../internal";

type _T = unknown;
type _O = CastOption;

@Injectable()
@CastAssign('instance')
@Nickname('Any', 'Unknown', 'Mixed')
@Fqn(...LY_INT_FQN)
export class AnyType extends AbstractScalar<_T, _O> implements AnyTypeLike {
    constructor() {
        super();
        this._castDoc = {
            $ref: 'Any'
        };
    }
    cast(value: unknown): _T {
        return leyyo.primitive.any(value);
    }
    // endregion internal
}