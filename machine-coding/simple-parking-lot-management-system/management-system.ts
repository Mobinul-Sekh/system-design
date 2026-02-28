import { ParkingArea } from "./parking-area";
import { User } from "./user";
import { Vahicle } from "./vahicle";

export class ParkingLotManagementSystem {
  vahicle: Vahicle;
  driver: User;
  parkingArea: ParkingArea;

  constructor(vahicle: Vahicle, driver: User, parkingArea: ParkingArea) {
    this.vahicle = vahicle;
    this.driver = driver;
    this.parkingArea = parkingArea;
  }

  private doesDriverHasLicense() {
    return this.driver.hasUserLicense();
  }

  private doesVahicleHasValidNumber() {
    return this.vahicle.isValicleNumberValid();
  }

  public processParking() {
    if (!this.doesDriverHasLicense()) {
      console.error(
        "Sorry can't let you park here -- you don't have valid License.",
      );
      return;
    }

    if (!this.doesVahicleHasValidNumber()) {
      console.error(
        "Sorry can't let you park here -- you're vahicle's number is invalid/missing.",
      );
      return;
    }

    const avaiableSameTypeBlocks = this.parkingArea
      .filterBlocksByVahicleType(this.vahicle.type)
      .filter((block) => block.currentVahicleParked < block.capacity);


    const foundBlock = avaiableSameTypeBlocks.toArray()[0];
    foundBlock.parkVahicle(this.vahicle);

    return {
      message: "Vahicle successfully parked.",
      vahicleNumber: this.vahicle.vahicleNumber,
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
    block.removeVahicle(this.vahicle.vahicleNumber);
    return {
      message: "Vahicle successfully departed.",
      vahicleNumber: this.vahicle.vahicleNumber;
    }
  }
}
