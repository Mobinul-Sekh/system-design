import { ParkingArea } from "./parking-area";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class ParkingLotManagementSystem {
  vehicle: Vehicle;
  driver: User;
  parkingArea: ParkingArea;

  constructor(vehicle: Vehicle, driver: User, parkingArea: ParkingArea) {
    this.vehicle = vehicle;
    this.driver = driver;
    this.parkingArea = parkingArea;
  }

  private doesDriverHasLicense() {
    return this.driver.hasUserLicense();
  }

  private doesVehicleHasValidNumber() {
    return this.vehicle.isValicleNumberValid();
  }

  public processParking() {
    if (!this.doesDriverHasLicense()) {
      console.error(
        "Sorry can't let you park here -- you don't have valid License.",
      );
      return;
    }

    if (!this.doesVehicleHasValidNumber()) {
      console.error(
        "Sorry can't let you park here -- you're vehicle's number is invalid/missing.",
      );
      return;
    }

    const avaiableSameTypeBlocks = this.parkingArea
      .filterBlocksByVehicleType(this.vehicle.type)
      .filter((block) => block.currentVehicleParked < block.capacity);


    const foundBlock = avaiableSameTypeBlocks.toArray()[0];
    foundBlock.parkVehicle(this.vehicle);

    return {
      message: "Vehicle successfully parked.",
      vehicleNumber: this.vehicle.vehicleNumber,
      driverName: this.driver.name,
      parkedBlockNumber: foundBlock.lotId,
      parkingAreaId: this.parkingArea.areaCode
    }
  }

  public processDeparting(parkingBlockId: string) {
    const block = this.parkingArea.parkingBlocks.values().find((block) => block.lotId === parkingBlockId);
    if (!block) {
      console.error("Enter a valid parkingBlockId");
      return;
    }
    block.removeVehicle(this.vehicle.vehicleNumber);
    return {
      message: "Vehicle successfully departed.",
      vehicleNumber: this.vehicle.vehicleNumber;
    }
  }
}
