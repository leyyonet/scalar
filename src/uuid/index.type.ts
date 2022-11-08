import {ScalarItemCast} from "../abstract";

export type UuidTextVersion = 'v1'|'v2'|'v3'|'v4'|'v5';
export type UuidIntVersion = 1|2|3|4|5;
export type UuidVersion = UuidTextVersion | UuidIntVersion;
export type UuidAlias = string;

export interface UuidTypeLike extends ScalarItemCast<UuidAlias> {
    is(value: unknown): boolean;
    generate(version?: UuidVersion): UuidAlias;
    version(value: UuidAlias): UuidIntVersion;
    empty(): UuidAlias;
}
