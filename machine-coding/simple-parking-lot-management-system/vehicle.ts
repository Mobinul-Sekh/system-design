import { VehicleTypeEnum } from "./parking-block";

export class Vehicle {
  vehicleNumber: string;
  type: VehicleTypeEnum;

  constructor(vehicleNumber: string, type: VehicleTypeEnum) {
    this.vehicleNumber = vehicleNumber;
    this.type = type;
  }

  public getVehicleType() {
    return this.type;
  }

  public getVehicleNumber() {
    return this.vehicleNumber;
  }

  public isValicleNumberValid() {
    return this.vehicleNumber.length == 8;
  }
}
