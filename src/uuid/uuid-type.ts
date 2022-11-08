// noinspection JSUnusedGlobalSymbols

import * as uuid from 'uuid';
import {CastAssign, DeveloperException, FieldType, Fqn, Injectable, leyyo, Nickname} from "@leyyo/core";
import {AbstractScalar} from "../abstract";
import {LY_INT_FQN} from "../internal";
import {UuidAlias, UuidIntVersion, UuidTextVersion, UuidTypeLike, UuidVersion} from "./index.type";

@Injectable()
@Nickname('Uuid')
@CastAssign('instance')
@Fqn(...LY_INT_FQN)
export class UuidType extends AbstractScalar<string> implements UuidTypeLike  {
    protected readonly _textVersions = ['v1','v2','v3','v4','v5'];
    protected readonly _intVersions = [1,2,3,4,5];
    constructor() {
        super();
        this._castDoc = {
            type: FieldType.STRING,
            format: 'uuid',
        }
    }
    // region private
    protected _textVersion(numeric: UuidIntVersion): UuidTextVersion {
        if (typeof numeric === 'number' && this._intVersions.includes(numeric)) {
            return `v${numeric}`;
        }
        throw new DeveloperException('scalar:invalid.version').with(this).patch(({version: numeric}));
    }
    protected _intVersion(text: UuidTextVersion): UuidIntVersion {
        if (typeof text === 'string' && this._textVersions.includes(text)) {
            return leyyo.primitive.integer(text.replace('v', '')) as UuidIntVersion;
        }
        throw new DeveloperException('scalar:invalid.version').with(this).patch(({version: text}));
    }
    // endregion private

    is(value: unknown): boolean {
        if (leyyo.primitive.isEmpty(value)) {return false;}
        return typeof value === 'string' && uuid.validate(value);
    }

    cast(gValue: unknown): string {
        const value = leyyo.primitive.text(gValue);
        if (!uuid.validate(value)) {
            throw new DeveloperException('scalar:invalid.uuid').with(this).patch(({value: gValue}));
        }
        return value;
    }
    /**
     * Generated uuid by version
     * */
    generate(version?: UuidVersion): string {
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
    version(value: UuidAlias): UuidIntVersion {
        return uuid.version(value);
    }
    /**
     * Generated empty uuid
     * */
    empty(): string {
        return uuid.NIL;
    }
}