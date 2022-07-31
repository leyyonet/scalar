// noinspection JSUnusedGlobalSymbols

import memoize from 'memoizee-decorator';
import {Bind, Fqn} from "@leyyo/fqn";
import {Key, leyyo, RecLike} from "@leyyo/core";
import {AssignCast, CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../../internal-component";
import {AbstractScalar} from "../abstract";
import {EnumCast, EnumOpt} from "./index-types";

type _O<T = Key> = EnumOpt<T & Key>;
// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@AssignCast('Enum', 'Enumeration')
@Bind()
export class EnumType extends AbstractScalar<Key, _O> implements EnumCast {

    @memoize({})
    is(value: unknown, opt?: _O): boolean {
        opt = leyyo.primitive.object(opt) as unknown as _O;
        return !!leyyo.primitive.enumeration(value, {...opt, silent: true});
    }

    @memoize({})
    cast<T = Key>(value: unknown, opt?: _O): T {
        return leyyo.primitive.enumeration(value, opt) as unknown as T;
    }
    docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: EnumOpt): CastApiDocResponse {
        // @todo
        return {type: 'string', 'enum': []};
    }
}
export const enumType = new EnumType();