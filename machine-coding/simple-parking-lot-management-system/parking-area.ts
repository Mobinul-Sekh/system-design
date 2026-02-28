import { ParkingBlock, VahicleTypeEnum } from "./parking-block";

export enum SecurityEnum {
  LOW = "low",
  DECENT = "decent",
  HIGH = "high",
}

export class ParkingArea {
  areaCode: string;
  areaCodeName: string;
  areaLocation: string;
  security: SecurityEnum;
  gates: number;
  parkingBlocks: Map<string, ParkingBlock> = new Map<string, ParkingBlock>();

  constructor(
    areaCode: string,
    areaCodeName: string,
    areaLocation: string,
    security: SecurityEnum,
    gates: number,
  ) {
    this.areaCode = areaCode;
    this.areaCodeName = areaCodeName;
    this.areaLocation = areaLocation;
    this.security = security;
    this.gates = gates;
  }

  public updateParkingAreaSecurity(security: SecurityEnum) {
    this.security = security;
  }

  public addParkingBlocks(block: ParkingBlock) {
    this.parkingBlocks.set(block.lotId, block);
  }

  public filterBlocksByVahicleType(type: VahicleTypeEnum) {
    return this.parkingBlocks.values().filter((block) => block.type === type);
  }

  public filterAvailableCapacityBlocks() {
    return this.parkingBlocks
      .values()
      .filter((block) => block.currentVahicleParked < block.capacity);
  }
}
