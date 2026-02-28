import { VahicleTypeEnum } from "./parking-block";

export class Vahicle {
  vahicleNumber: string;
  type: VahicleTypeEnum;

  constructor(vahicleNumber: string, type: VahicleTypeEnum) {
    this.vahicleNumber = vahicleNumber;
    this.type = type;
  }

  public getVahicleType() {
    return this.type;
  }

  public getVahicleNumber() {
    return this.vahicleNumber;
  }

  public isValicleNumberValid() {
    return this.vahicleNumber.length == 8;
  }
}
