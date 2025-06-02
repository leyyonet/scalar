import moment from "moment";
import {CastBasic, CastAlias, CastDocCallback, CastDocResponse, castHub, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to} from "@leyyo/common";
import {FQN} from "../internal";

// noinspection JSUnusedGlobalSymbols
@Fqn(FQN)
@CastBasic()
@CastAlias('Datetime')
@Bind('static')
export class DateType {
    static readonly priority = {
        instance: [[Date, 1], [moment, 1]],
        array: 3,
        string: 3,
        number: 3,
        any: 99,
    } as CastPriority;

    static canBe(value: unknown): boolean {
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

    static exact(value: unknown): boolean {
        return value instanceof Date;
    }

    static cast(value: unknown): Date {
        return $to.date(value);
    }

    static doc(openApi: CastDocCallback): CastDocResponse {
        return openApi(this, {type: 'string', format: 'date-time'});
    }

    static {
        castHub.pending.addClone(DateType, Date);
    }

}

// noinspection JSUnusedGlobalSymbols
export type Moment = moment.Moment;
export const Datetime = DateType;
export {moment};

