import {Fqn, Loader} from '@leyyo/core';
import {FQN_PCK} from './internal';
import {decoratorItems} from "./decorators/loader";
import {literalItems} from "./literals/loader";
import {typeItems} from "./type/loader";
import {utilsItems} from "./utils/loader";


@Loader(...decoratorItems, ...literalItems, ...typeItems, ...utilsItems)
@Fqn(FQN_PCK)
export class ScalarLoader {
}
