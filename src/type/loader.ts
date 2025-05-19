import {AnyType} from "./any-type";
import {ArrayType} from "./array-type";
import {BooleanType} from "./boolean-type";
import {BufferType} from "./buffer-type";
import {DateType} from "./date-type";
import {DictType} from "./dict-type";
import {FloatType} from "./float-type";
import {IntegerType} from "./integer-type";
import {ObjectType} from "./object-type";
import {RecordType} from "./record-type";
import {RegexpType} from "./regexp-type";
import {SimpleDateType} from "./simple-date-type";
import {SimpleTimeType} from "./simple-time-type";
import {StringType} from "./string-type";
import {TextType} from "./text-type";
import {UuidType} from "./uuid-type";
import {SetType} from "./set-type";
import {MapType} from "./map-type";
import {ListType} from "./list-type";

export const typeItems = [AnyType, ArrayType, BooleanType, BufferType, DateType,
    DictType, FloatType, IntegerType, ListType, MapType, ObjectType, RecordType, RegexpType,
    SetType, SimpleDateType, SimpleTimeType, StringType, TextType, UuidType];