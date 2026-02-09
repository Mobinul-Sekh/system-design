export class Quack implements QuackBahevior {
  quack() {
    console.log("Quacks!");
  }
}

export class MuteQuack implements QuackBahevior {
  quack() {
    console.log("<< slience >>");
  }
}

export class Squack implements QuackBahevior {
  quack() {
    console.log("Squack!");
  }
}
