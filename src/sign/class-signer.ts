import {DecoInstanceLike, Fqn} from "@leyyo/core";
import {$assert, $descriptor, $dev, $is, ClassLike, Func, Obj} from "@leyyo/common";
import {FQN} from "../internal";
import {ClassHashLambda, ClassSignerLike, ClassSortLambda} from "./index-types";
import {ScalarHashSign, ScalarSortSign} from "../internal.symbols";

@Fqn(FQN)
class ClassSigner implements ClassSignerLike {

    private _findFunction(target: ClassLike | Func | Obj): ClassLike | Func {
        if ($is.empty(target)) {
            return target as undefined;
        }
        switch (typeof target) {
            case 'function':
                return target;
            case 'object':
                return target?.constructor;
            default:
                return target;
        }
    }

    private _findCallable<F = any>(target: ClassLike | Func | Obj, kind: symbol): F {
        if ($is.empty(target)) {
            return undefined;
        }
        switch (typeof target) {
            case 'function':
                if (typeof target[kind] === 'function') {
                    return target[kind] as F;
                }
                else {
                    return target as F;
                }
            case 'object':
                return this._findCallable(target?.constructor, kind);
            default:
                return undefined;
        }
    }

    remove(target: ClassLike | Func | Obj, kind: symbol, ins?: DecoInstanceLike): boolean {
        const clazz = this._findFunction(target);
        $assert.func(clazz, () => $dev.desc(ins, {
            kind: kind?.description,
            where: 'leyyo.scalar.ClassSigner',
            method: 'remove'
        }));
        return $descriptor.remove(clazz, kind);
    }

    set<T = any>(target: ClassLike | Func | Obj, kind: symbol, value: T, ins?: DecoInstanceLike): void {
        const clazz = this._findFunction(target);
        $assert.func(clazz, () => $dev.desc(ins, {
            kind: kind?.description,
            where: 'leyyo.scalar.ClassSigner',
            method: 'set'
        }));
        if ($descriptor.has(clazz, kind)) {
            throw $dev.developerError({
                issue: 'sign.duplicated',
                kind: kind?.description,
                desc: ins?.description,
                where: 'leyyo.scalar.ClassSigner',
                method: 'set'
            })
        }
        $descriptor.save(clazz, kind, value);
    }

    get<T = any>(target: ClassLike | Func | Obj, kind: symbol, ins?: DecoInstanceLike, throwable?: boolean): T {
        const clazz = this._findFunction(target);
        if (throwable) {
            $assert.func(clazz, () => $dev.desc(ins, {
                kind: kind?.description,
                where: 'leyyo.scalar.ClassSigner',
                method: 'get'
            }));
            return $descriptor.getValue<T>(clazz, kind);
        }
        return this._findCallable<T>(clazz, kind);
    }

    getHash<T = any>(target: ClassLike | Func | Obj, ins?: DecoInstanceLike, throwable?: boolean): ClassHashLambda<T> {
        return this.get<ClassHashLambda<T>>(target, ScalarHashSign, ins, throwable);
    }

    getSort<T = any>(target: ClassLike | Func | Obj, ins?: DecoInstanceLike, throwable?: boolean): ClassSortLambda<T> {
        return this.get<ClassSortLambda<T>>(target, ScalarSortSign, ins, throwable);
    }

    setHash<T = any>(target: ClassLike | Func | Obj, value: ClassHashLambda<T>, ins?: DecoInstanceLike): void {
        this.set(target, ScalarHashSign, value, ins);
    }

    setSort<T = any>(target: ClassLike | Func | Obj, value: ClassSortLambda<T>, ins?: DecoInstanceLike): void {
        this.set(target, ScalarSortSign, value, ins);
    }
}

export const classSigner: ClassSignerLike = new ClassSigner();
