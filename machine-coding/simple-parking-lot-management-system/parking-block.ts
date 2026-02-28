import { Vahicle } from "./vahicle";

export enum VahicleTypeEnum {
  "2-WHEEL" = "2-Wheeler",
  "4-WHEEL" = "4-Wheeler",
  "OTHER" = "other",
}

export class ParkingBlock {
  lotId: string;
  type: VahicleTypeEnum;
  capacity: number;
  currentVahicleParked: number = 0;
  vahicleDB: Map<string, Vahicle> = new Map<string, Vahicle>();

  constructor(lotId: string, type: VahicleTypeEnum, capacity: number) {
    this.lotId = lotId;
    this.type = type;
    this.capacity = capacity;
  }

  private hasCapacity() {
    return this.currentVahicleParked < this.capacity;
  }

  private isVahicleParked(vahicleNumber: string) {
    return this.vahicleDB.has(vahicleNumber);
  }

  public parkVahicle(vahicle: Vahicle) {
    if (!this.hasCapacity()) {
      console.log("Parking Block is already full.");
    }

    this.vahicleDB.set(vahicle.vahicleNumber, vahicle);
    this.currentVahicleParked += 1;
  }

  public removeVahicle(vahicleNumber: string) {
    if (!this.isVahicleParked(vahicleNumber)) {
      console.error("Your Vahicle is not parked in this block");
      return;
    }

    this.vahicleDB.delete(vahicleNumber);
    this.currentVahicleParked -= 1;
  }
}
