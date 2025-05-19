import moment from "moment";
import {AssignType, CastApiDocResponse, CastPriority} from "@leyyo/cast";
import {Bind, Fqn} from "@leyyo/core";
import {$is, $to, Dict} from "@leyyo/common";
import {FQN_PCK} from "../internal";

// noinspection JSUnusedLocalSymbols
@Fqn(FQN_PCK)
@AssignType('Time', 'SimpleTime', 'IsoTime')
@Bind('static')
export class SimpleTimeType {
    private static readonly _PATTERN_HM = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    private static readonly _PATTERN_HMS = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    private static readonly _PATTERN_HMSZ = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)(\.(\d{1,9}))?$/;

    static readonly priority = {
        instance: [[Date, 1], [moment, 1]],
        string: 2,
        number: 2,
        any: 99,
    } as CastPriority;

    static exact(value: unknown): boolean {
        return typeof value === 'string' && (this._PATTERN_HMS.test(value) || this._PATTERN_HM.test(value) || this._PATTERN_HMSZ.test(value));
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
                return this._PATTERN_HMS.test(value) || this._PATTERN_HM.test(value) || this._PATTERN_HMSZ.test(value);
            case "number":
                return Number.isInteger(value) && value > 0;
        }
        return false;
    }

    static cast(value: unknown): string {
        if ($is.empty(value)) {
            return value as undefined;
        }
        if (typeof value === 'string') {
            let str = value as string;
            let hours: number;
            let minutes: number;
            let seconds: number;
            let milliseconds: number;
            let parts: Array<string>;
            if (this._PATTERN_HMS.test(str)) {
                parts = str.split(':');
            } else if (this._PATTERN_HM.test(str)) {
                parts = str.split(':');
            } else {
                str = str.replace(/./g, ':');
                parts = str.split(':');
            }
            [hours, minutes, seconds, milliseconds] = parts.map(v => {
                if (v === undefined) {
                    return 0;
                }
                try {
                    const num = parseInt(v);
                    return (num > 0) ? num : 0;
                } catch (e) {
                    return 0;
                }
            });
            const date = new Date(0, 0, 0, hours, minutes, seconds, milliseconds);
            return date.toISOString().substring(11);
        }
        const date = $to.date(value);
        if (date) {
            return date.toISOString().substring(11);
        }
        return $to.$secure.$unexpectedError(value, ['string', 'number', 'date']);
    }

    static doc(target: unknown, property: PropertyKey, openApi: Dict): CastApiDocResponse {
        return {type: 'string', format: 'date'};
    }

}
