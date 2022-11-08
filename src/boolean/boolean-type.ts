// noinspection JSUnusedGlobalSymbols

import {CastAlias, CastAssign, FieldType, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {LY_INT_FQN} from "../internal";
import {AbstractScalar} from "../abstract";
import {BooleanTypeLike} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Injectable()
@Nickname('Bool')
@CastAlias(Boolean)
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class BooleanType extends AbstractScalar<boolean> implements BooleanTypeLike {
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.BOOLEAN,
        }
    }
    // region cast
    cast(value: unknown): boolean {
        return (typeof value === 'boolean') ? value : leyyo.primitive.boolean(value);
    }
    // endregion cast
    // region custom
    isTrue(value: unknown): boolean {
        return leyyo.primitive.isTrue(value);
    }
    isFalse(value: unknown): boolean {
        return leyyo.primitive.isFalse(value);
    }
    stringify(value: boolean): string {
        if (value === true) {return 'true';}
        if (value === false) {return 'false';}
        return undefined;
    }
    toInteger(value: boolean): number {
        if (value === true) {return 1;}
        if (value === false) {return 0;}
        return undefined;
    }
    // endregion custom
}

