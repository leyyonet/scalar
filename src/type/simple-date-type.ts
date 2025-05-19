import moment from "moment";
import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict, List} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('SimpleDate', 'IsoDate')
@Bind('static')
export class SimpleDateType {
    private static readonly _PATTERN_YMD = /^\d{4}[\/\-.](0?[1-9]|1[012])[\/\-.](0?[1-9]|[12][0-9]|3[01])$/;
    private static readonly _PATTERN_DMY = /^(0?[1-9]|[12][0-9]|3[01])[\/\-.](0?[1-9]|1[012])[\/\-.]\d{4}$/;

    static readonly priority = {
        instance: [[Date, 1], [moment, 1]],
        string: 2,
        number: 2,
        any: 99,
    } as CastPriority;

    static exact(value: unknown): boolean {
        return typeof value === 'string' && this._PATTERN_YMD.test(value);
    }

    static is(value: unknown): boolean {
        if ($is.empty(value)) {
            return false;
        }
        if (value instanceof Date || value instanceof moment) {
            return true;
        }
        switch (typeof value) {
            case "string":
                return this._PATTERN_YMD.test(value) || this._PATTERN_DMY.test(value);
            case "number":
                return Number.isInteger(value) && value > 0;
        }
        return false;
    }

    static cast(value: unknown): string {
        if ($is.empty(value)) {
            return value as undefined;
        }
        if (typeof value === 'string' && this._PATTERN_DMY.test(value)) {
            const [day, month, year] = value.split(/\/|-|./);
            value = `${year}-${month}-${day}`;
        }
        const date = $to.date(value);
        if (date) {
            date.setHours(0, 0, 0, 0);
            return date.toISOString().substring(0, 10);
        }
        return $to.$secure.$unexpectedError(value, ['string', 'number', 'date']);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string', format: 'date'};
    }

}
