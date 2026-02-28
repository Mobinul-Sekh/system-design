import { ParkingLotAdmin } from "./admin";
import { ParkingArea, SecurityEnum } from "./parking-area";
import { ParkingBlock } from "./parking-block";

export class ParkingLotAdminSystem {
  adminsDB: Map<string, ParkingLotAdmin> = new Map<string, ParkingLotAdmin>();
  parkingAreaDB: Map<string, ParkingArea> = new Map<string, ParkingArea>();

  public createAdmin(admin: ParkingLotAdmin) {
    if (this.adminsDB.has(admin.adminId)) {
      console.error("Admin already exists");
      return;
    }

    this.adminsDB.set(admin.adminId, admin);
  }

  public isValidAdmin(adminId: string) {
    if (!this.adminsDB.has(adminId)) {
      console.error("Your are not authorize to access this service.");
      return;
    }
  }

  private isParkingAreaExists(areaCode: string) {
    if (!this.parkingAreaDB.has(areaCode)) {
      console.log("Parking area not found with code : ", + , areaCode);
      return;
    }
  }

  public addNewParkingArea(area: ParkingArea) {
    if (this.parkingAreaDB.has(area.areaCode)) {
      console.error("Parking area already exists.");
      return;
    }

    this.parkingAreaDB.set(area.areaCode, area);
  }

  public addNewBlockInParkingArea(
    areaCode: string,
    parkingBlock: ParkingBlock,
  ) {
    this.isParkingAreaExists(areaCode);
    const parkingArea = this.parkingAreaDB.get(areaCode);

    if (parkingArea?.parkingBlocks.has(parkingBlock.lotId)) {
      console.error("Parking block alread exists.");
      return;
    }

    parkingArea?.addParkingBlocks(parkingBlock);
  }

  public updateParkingAreaSecurity(areaCode: string, security: SecurityEnum) {
    this.isParkingAreaExists(areaCode);
    const parkingArea = this.parkingAreaDB.get(areaCode);

    parkingArea?.updateParkingAreaSecurity(security);
  }
}
