import {leyyo} from "../core";
import {Fqn, fqn} from "../fqn";
import {cast} from "../cast";
import {ScalarOptHost} from "../types";
import {ScalarAbstract} from "../scalar-abstract";
import {textType} from "../cases/text/text-type";
import {InvalidHostException} from "../errors";
import isValidHost from "is-valid-host";

type T = string;
type O = ScalarOptHost;

@Fqn('leyyo', 'scalar')
export class HostType extends ScalarAbstract<T, O> {
    protected static readonly _LABELS = ['localhost'];

    constructor() {
        super();
        cast.add(this.cast, 'Host');
    }

    innerCast(value: unknown, opt?: O): T {
        value = textType.innerCast(value, opt);
        if (leyyo.is.empty(value)) {
            return null;
        }
        if (!isValidHost(value as string)) {
            throw new InvalidHostException(opt?.$name, value as string, 'host', {clazz: fqn.get(this)});
        }
        return value as T;
    }

    cast(value: unknown, opt?: O): T | null {
        try {
            value = this.innerCast(value, opt);
        } catch (e) {
            this._helper.checkError(e, opt);
        }
        value = this._helper.checkEmpty(value, opt);
        return value as T;
    }

    is(value: unknown, opt?: O): boolean {
        if (typeof value !== "string") {
            return false;
        }
        return isValidHost(value as string);
    }
}
// noinspection JSUnusedGlobalSymbols
export const hostType = new HostType();