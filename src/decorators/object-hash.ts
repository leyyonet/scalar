import {bindHandler, decoratorPool} from "@leyyo/core";
import {FQN_PCK} from "../internal";
import {$assert, $dev, $is, Dict} from "@leyyo/common";
import {ClassHashLambda, classSigner, ClassSortLambda} from "../class-signer";

export function ObjectHash(fn: ClassHashLambda, useForAlsoSort?: boolean): ClassDecorator;
export function ObjectHash(property: string, useForAlsoSort?: boolean): ClassDecorator;
export function ObjectHash(fnOrProperty: ClassHashLambda | string, useForAlsoSort?: boolean): ClassDecorator {
    return clazz =>
        deco.process([clazz], {fnOrProperty, useForAlsoSort});
}

interface O {
    fn: ClassHashLambda;
    property?: string;
    useForAlsoSort?: boolean;
    sortLambda?: ClassSortLambda;
}

interface P {
    fnOrProperty: ClassHashLambda | string;
    useForAlsoSort?: boolean;
}

const deco = decoratorPool.newId<O, Dict, P>(ObjectHash)
    .fqn(FQN_PCK)
    .targets('class')
    .rules('no-multiple', 'no-inherited')
    .processor((ins, p: P) => {
        const creator = ins.asClass.creator;

        const opt = {} as O;
        if (typeof p.fnOrProperty === 'string') {
            $assert.text(p.fnOrProperty, () => $dev.desc(ins, {field: 'property'}));
            opt.property = p.fnOrProperty;
            if (typeof creator?.prototype[opt.property] === 'function') {
                opt.fn = creator?.prototype[opt.property] as ClassHashLambda;
            } else if (typeof creator[opt.property] === 'function') {
                opt.fn = creator[opt.property] as ClassHashLambda;
            } else {
                throw $dev.invalidError({issue: 'property.not.found', desc: ins.description, property: opt.property});
            }
            if (!bindHandler.isBound(opt.fn)) {
                throw $dev.developerError({issue: 'method.not.bound', desc: ins.description, property: opt.property});
            }
        } else {
            opt.fn = p.fnOrProperty;
            $assert.func(opt.fn, () => $dev.desc(ins, {field: 'fn'}));
        }
        if (typeof creator === 'function') {
            classSigner.setHash(creator, opt.fn, ins);
            if (creator.prototype) {
                classSigner.setHash(creator.prototype, opt.fn, ins);
            }

            if (p.useForAlsoSort) {
                opt.sortLambda = (first: any, second: any) => {
                    if ($is.empty(first)) {
                        if ($is.empty(second)) {
                            return 0; // first equals to second
                        }
                        return -1; // first less than second
                    } else if ($is.empty(second)) {
                        return 1; // first greater than second
                    }
                    const firstHash = opt.fn(first);
                    const secondHash = opt.fn(second);
                    if (firstHash > secondHash) {
                        return 1; // first greater than second
                    } else if (firstHash < secondHash) {
                        return -1; // first less than second
                    }
                    return 0; // first equals to second
                };
                classSigner.setSort(creator, opt.sortLambda, ins);
                if (creator.prototype) {
                    classSigner.setSort(creator.prototype, opt.sortLambda, ins);
                }
            }
        }
        ins.set(opt);
    });
