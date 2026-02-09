// what the duck simulator.
import { FlyWithRocket } from "./WhatTheDuck/baheviors/flyWithWings";
import { MallardDuck } from "./WhatTheDuck/mallardDuck";
import { ModelDuck } from "./WhatTheDuck/modelDuck";

const mallard = new MallardDuck();
mallard.performFly();
mallard.performQuack();

// with setter function now we can set the baheviors at runtime.
const modelDuck = new ModelDuck();
modelDuck.setFlyBahevior(new FlyWithRocket());
modelDuck.performFly();
modelDuck.performQuack();
