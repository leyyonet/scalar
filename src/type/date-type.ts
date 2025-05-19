import moment from "moment";
import {AssignType, CastApiDocResponse, castPool, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('Datetime')
@Bind('static')
export class DateType {
    static readonly priority = {
        instance: [[Date, 1], [moment, 1]],
        array: 3,
        string: 3,
        number: 3,
        any: 99,
    } as CastPriority;

    static is(value: unknown): boolean {
        if ($is.empty(value)) {
            return false;
        }
        if (value instanceof Date || value instanceof moment) {
            return true;
        }
        switch (typeof value) {
            case "string":
                return new Date(value).getTime() > 0;
            case "number":
                return Number.isInteger(value) && value > 0;
        }
        return false;
    }

    static cast(value: unknown): Date {
        return $to.date(value);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string', format: 'date-time'};
    }

}

castPool.copy(DateType, Date);

export type Moment = moment.Moment;
export {moment};
