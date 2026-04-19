import { Vehicle } from "./vehicle";

export enum VehicleTypeEnum {
  "2-WHEEL" = "2-Wheeler",
  "4-WHEEL" = "4-Wheeler",
  "OTHER" = "other",
}

export class ParkingBlock {
  lotId: string;
  type: VehicleTypeEnum;
  capacity: number;
  currentVehicleParked: number = 0;
  vehicleDB: Map<string, Vehicle> = new Map<string, Vehicle>();

  constructor(lotId: string, type: VehicleTypeEnum, capacity: number) {
    this.lotId = lotId;
    this.type = type;
    this.capacity = capacity;
  }

  private hasCapacity() {
    return this.currentVehicleParked < this.capacity;
  }

  private isVehicleParked(vehicleNumber: string) {
    return this.vehicleDB.has(vehicleNumber);
  }

  public parkVehicle(vehicle: Vehicle) {
    if (!this.hasCapacity()) {
      console.log("Parking Block is already full.");
    }

    this.vehicleDB.set(vehicle.vehicleNumber, vehicle);
    this.currentVehicleParked += 1;
  }

  public removeVehicle(vehicleNumber: string) {
    if (!this.isVehicleParked(vehicleNumber)) {
      console.error("Your Vehicle is not parked in this block");
      return;
    }

    this.vehicleDB.delete(vehicleNumber);
    this.currentVehicleParked -= 1;
  }
}
