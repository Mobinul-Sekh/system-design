import { NoFly } from "./baheviors/flyWithWings";
import { MuteQuack } from "./baheviors/quack";
import { Duck } from "./duck";

export class ModelDuck extends Duck {
  constructor() {
    super();
    // default baheviors.
    this.flyBahevior = new NoFly();
    this.quackBahevior = new MuteQuack();
  }
}
