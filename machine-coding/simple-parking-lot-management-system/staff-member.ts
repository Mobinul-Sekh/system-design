class ParkingLotStaff {
  staffId: string;
  name: string;
  lotId: string;

  constructor(staffId: string, name: string, lotId: string) {
    this.staffId = staffId;
    this.lotId = lotId;
    this.name = name;
  }

  public getAdminName() {
    return this.name;
  }

  public getAdminId() {
    return this.staffId;
  }

  public raiseIssue() {
    console.log("Currenly parking lot " + this.lotId + "has some issue");
  }

  public serviceRequest() {
    console.log("Parking log " + this.lotId + " needs some service");
  }
}
