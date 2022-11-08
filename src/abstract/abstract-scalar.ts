import {
    ApiSchemaLike,
    Bind,
    CastDocIn,
    CastOption,
    FieldType,
    Fqn,
    leyyo,
    LoggerLike, PropertyReflectLike,
    RecLike
} from "@leyyo/core";
import {LY_INT_FQN} from "../internal";
import {ScalarItemCast,} from "./index.type";

// noinspection JSUnusedLocalSymbols
@Fqn(...LY_INT_FQN)
@Bind()
export abstract class AbstractScalar<T = unknown, O extends CastOption = CastOption> implements ScalarItemCast<T, O> {
    [x: string | number]: unknown;
    protected LOG: LoggerLike;
    protected _castDoc: ApiSchemaLike = {
        type: FieldType.STRING
    };

    protected constructor() {
        this.LOG = leyyo.logger.assign(this);
        leyyo.binder.bindAll(this);
    }
    abstract cast(value: unknown, opt?: O): T;

    $castDoc?(ref: PropertyReflectLike, openApi: CastDocIn): unknown {
        return this._castDoc;
    }

    castObjectOf(value: unknown | RecLike<T>, opt?: O): RecLike<T> {
        return leyyo.primitive.object(value, this.cast) as RecLike<T>;
    }

    castArrayOf(value: unknown | Array<T>, opt?: O): Array<T> {
        return leyyo.primitive.array(value, this.cast) as Array<T>;
    }
}