import {Fqn, leyyo, Module} from "@leyyo/core";
import {LY_INT_FQN, LY_INT_PACKAGE} from "../internal";
import {AbstractScalar} from "../abstract";
import {AnyType} from "../any";
import {ArrayType} from "../array";
import {BooleanType} from "../boolean";
import {DateType} from "../date";
import {EnumType} from "../enum";
import {FloatType} from "../float";
import {IntegerType} from "../integer";
import {ObjectType} from "../object";
import {StringType} from "../string";
import {TextType} from "../text";
import {UuidType} from "../uuid";

@Module(AbstractScalar, AnyType, ArrayType, BooleanType, DateType, EnumType, FloatType,
    IntegerType, ObjectType, StringType, TextType, UuidType)
@Fqn(...LY_INT_FQN)
export class LeyyoScalarModule {
    constructor() {
        leyyo.package.add(LY_INT_PACKAGE);
    }
}