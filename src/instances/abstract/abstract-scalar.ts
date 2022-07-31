import {Bind, fqn, Fqn} from "@leyyo/fqn";
import {leyyo, RecLike, TypeOpt} from "@leyyo/core";
import {CastApiDocResponse} from "@leyyo/cast";
import {FQN_NAME} from "../../internal-component";
import {ScalarLike} from "../../base";
import {ArrayOpt, ObjectOpt} from "../index";
import {ScalarItemCast} from "./index-types";

// noinspection JSUnusedLocalSymbols
@Fqn(...FQN_NAME)
@Bind()
export abstract class AbstractScalar<T = unknown, O extends TypeOpt = TypeOpt> implements ScalarItemCast<T, O> {
    [x: string | number]: unknown;

    static _scalar: ScalarLike;

    constructor() {
        fqn.refresh(this);
    }

    abstract is(value: unknown, opt?: O): boolean;

    abstract cast(value: unknown, opt?: O): T;

    abstract docCast(target: unknown, property: PropertyKey, openApi: RecLike, opt?: O): CastApiDocResponse;

    isObjectOf(value: unknown, opt?: ObjectOpt & O): boolean {
        return AbstractScalar._scalar.object.isEvery(value, this.is, opt);
    }

    castObjectOf<T2 = T>(value: unknown, opt?: ObjectOpt & O): RecLike<T2> {
        opt = (leyyo.primitive.object(opt) ?? {}) as O;
        return AbstractScalar._scalar.object.cast(value, {...opt, children: {value: {fn: this.cast}}}) as RecLike<T2>;
    }

    isArrayOf(value: unknown, opt?: ArrayOpt & O): boolean {
        return AbstractScalar._scalar.array.isEvery(value, this.is, opt);
    }

    castArrayOf<T2 = T>(value: unknown, opt?: ArrayOpt & O): Array<T2> {
        opt = (leyyo.primitive.object(opt) ?? {}) as O;
        return AbstractScalar._scalar.array.cast(value, {...opt, children: {value: {fn: this.cast}}}) as Array<T2>;
    }
}