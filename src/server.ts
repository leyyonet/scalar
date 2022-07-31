import {fqn} from "@leyyo/fqn";
import {describe, it, printDetailed} from "@leyyo/core";
import {castPool} from "@leyyo/cast";
import {genericPool} from "@leyyo/generics";
import {scalar} from "./base";
import {sampleBoolean} from "./samples";


printDetailed('scalar', fqn.report(scalar));
printDetailed('cast', castPool.info);
printDetailed('generic', genericPool.info);

sampleBoolean(describe, it);