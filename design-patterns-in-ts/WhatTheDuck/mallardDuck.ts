import { Duck } from "./duck";
import { FlyWithWings } from "./baheviors/flyWithWings";
import { Quack } from "./baheviors/quack";

export class MallardDuck extends Duck {
  constructor() {
    super();
    this.flyBahevior = new FlyWithWings();
    this.quackBahevior = new Quack();
  }
}
