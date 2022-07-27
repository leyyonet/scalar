// noinspection JSUnusedGlobalSymbols

import {ScalarLike} from "./index-types";

export * from './casts';
export * from './abstract-scalar';
export * from './scalar-test';
export * from './index-enums';
export * from './index-errors';
export * from './index-types';
export * from './scalar';

import {Scalar} from "./scalar";
export const scalar: ScalarLike = new Scalar();
scalar.initialize();
export const anyType = scalar.any;
export const arrayType = scalar.array;
export const booleanType = scalar.boolean;
export const boolType = scalar.boolean;
export const dateType = scalar.date;
export const enumType = scalar.enum;
export const floatType = scalar.float;
export const funcType = scalar.func;
export const intType = scalar.integer;
export const integerType = scalar.integer;
export const objectType = scalar.object;
export const stringType = scalar.string;
export const textType = scalar.text;
export const uuidType = scalar.uuid;