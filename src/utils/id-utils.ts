import * as uuid from "uuid";
import {$is, Func} from "@leyyo/common";
import {Fqn} from "@leyyo/core";
import {IdUtilsLike} from "./index.types";
import {FQN} from "../internal";

@Fqn(FQN)
class IdUtils implements IdUtilsLike {
    readonly emptyUuid = uuid.NIL;

    isUuid(value: string): boolean {
        if ($is.empty(value)) {
            return false;
        }
        return typeof value === 'string' && uuid.validate(value);
    }

    newUuid(version?: string | number): string {
        let verStr: string;
        switch (typeof version) {
            case "number":
                verStr = 'v' + version.toString(10);
                break;
            case "string":
                verStr = version.trim();
                break;
            default:
                verStr = 'v4';
                break;
        }
        if (typeof uuid[verStr] !== 'function') {
            verStr = 'v4';
        }
        return uuid[verStr]();
    }
}

export const idUtils: IdUtilsLike = new IdUtils();
