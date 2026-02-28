class ParkingLotStuff {
  stuffId: string;
  name: string;
  lotId: string;

  constructor(stuffId: string, name: string, lotId: string) {
    this.stuffId = stuffId;
    this.lotId = lotId;
    this.name = name;
  }

  public getAdminName() {
    return this.name;
  }

  public getAdminId() {
    return this.stuffId;
  }

  public raiseIssue() {
    console.log("Currenly parking lot " + this.lotId + "has some issue");
  }

  public serviceRequest() {
    console.log("Parking log " + this.lotId + " needs some service");
  }
}
