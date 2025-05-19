import * as uuid from "uuid";
import {$is, Func} from "@leyyo/common";
import {Fqn} from "@leyyo/core";
import {IdUtilsLike, NanoIdOpt} from "./index-type";
import {FQN_PCK} from "../internal";
import {customAlphabet, nanoid} from "nanoid";
import {nanoid as nonSecureId} from "nanoid/non-secure";

@Fqn(FQN_PCK)
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
        if (typeof uuid[version] !== 'function') {
            version = 'v4';
        }
        return uuid[version]();
    }

    newNanoid(opt?: NanoIdOpt): string {
        let fn: Func;
        if (typeof opt?.alphabet === 'string') {
            fn = customAlphabet(opt.alphabet, opt?.defaultSize ?? 10);
        } else {
            fn = opt?.nonSecure ? nonSecureId : nanoid;
        }
        return fn(opt?.length);
    }
}

export const idUtils: IdUtilsLike = new IdUtils();