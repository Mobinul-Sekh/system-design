export class FlyWithWings implements FlyBahevior {
  fly() {
    console.log("Flying with wings!");
  }
}

export class NoFly implements FlyBahevior {
  fly() {
    console.log("Can't fly");
  }
}

export class FlyWithRocket implements FlyBahevior {
  fly() {
    console.log("Flying with rockettt..");
  }
}
