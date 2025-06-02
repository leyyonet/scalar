import {bindHandler, decoratorPool} from "@leyyo/core";
import {FQN} from "../internal";
import {$assert, $dev, Dict} from "@leyyo/common";
import {classSigner, ClassSortLambda} from "../sign";

export function ObjectSort(fn: ClassSortLambda): ClassDecorator;
export function ObjectSort(property: string): ClassDecorator;
export function ObjectSort(fnOrProperty: ClassSortLambda | string): ClassDecorator {
    return clazz =>
        deco.process([clazz], {fnOrProperty});
}

interface O {
    fn: ClassSortLambda;
    property?: string;
}

interface P {
    fnOrProperty: ClassSortLambda | string;
}

const deco = decoratorPool.newId<O, Dict, P>(ObjectSort)
    .fqn(FQN)
    .targets('class')
    .rules('no-multiple', 'no-inherited')
    .processor((ins, p: P) => {
        const creator = ins.asClass.creator;

        const opt = {} as O;
        if (typeof p.fnOrProperty === 'string') {
            $assert.text(p.fnOrProperty, () => $dev.desc(ins, {field: 'property'}));
            opt.property = p.fnOrProperty;
            if (typeof creator.prototype[opt.property] === 'function') {
                opt.fn = creator.prototype[opt.property] as ClassSortLambda;
            }
            else if (typeof creator[opt.property] === 'function') {
                opt.fn = creator[opt.property] as ClassSortLambda;
            }
            else {
                throw $dev.invalidError({issue: 'property.not.found', desc: ins.description, property: opt.property});
            }
            if ( !bindHandler.isBound(opt.fn)) {
                throw $dev.developerError({issue: 'method.not.bound', desc: ins.description, property: opt.property});
            }
        }
        else {
            opt.fn = p.fnOrProperty;
            $assert.func(opt.fn, () => $dev.desc(ins, {field: 'fn'}));
        }

        if (typeof creator === 'function') {
            classSigner.setSort(creator, opt.fn, ins);
            if (creator.prototype) {
                classSigner.setSort(creator.prototype, opt.fn, ins);
            }
        }
        ins.set(opt);
    });
