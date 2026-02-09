export abstract class Duck {
  protected flyBahevior!: FlyBahevior;
  protected quackBahevior!: QuackBahevior;

  public setFlyBahevior(fb: FlyBahevior) {
    this.flyBahevior = fb;
  }

  public setQuackBahevior(qb: QuackBahevior) {
    this.quackBahevior = qb;
  }

  public performFly() {
    this.flyBahevior.fly();
  }

  public performQuack() {
    this.quackBahevior.quack();
  }

  public swim() {
    console.log("All ducks swim, even the toys!");
  }
}
