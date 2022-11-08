// noinspection JSUnusedGlobalSymbols

import {CastAssign, EnumKey, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {EnumTypeLike} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Injectable()
@Nickname('Enum', 'Enumeration')
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class EnumType extends AbstractScalar<EnumKey> implements EnumTypeLike {
    constructor() {
        super();
    }
    cast<E extends EnumKey = EnumKey>(value: unknown): E {
        return leyyo.primitive.enum<E>(value, null);
    }
}