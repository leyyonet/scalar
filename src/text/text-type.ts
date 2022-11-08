// noinspection JSUnusedGlobalSymbols

import {CastAssign, FieldType, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {LY_INT_FQN} from "../internal";
import {TextTypeLike} from "./index.type";
import {AbstractScalar} from "../abstract";

@Injectable()
@Fqn(...LY_INT_FQN)
@Nickname('Text')
@CastAssign('instance')
export class TextType extends AbstractScalar<string> implements TextTypeLike {
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.STRING,
        }
    }

    cast(value: unknown): string {
        return leyyo.primitive.text(value);
    }
}