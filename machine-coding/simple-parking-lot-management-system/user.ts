export class User {
  name: string;
  phoneNo: string;
  hasLicense: boolean;
  vehicleNumber: string;

  constructor(
    name: string,
    phoneNo: string,
    hasLicense: boolean,
    vehicleNumber: string,
  ) {
    this.name = name;
    this.phoneNo = phoneNo;
    this.hasLicense = hasLicense;
    this.vehicleNumber = vehicleNumber;
  }

  public getUserName() {
    return this.name;
  }

  public getUserPhoneNo() {
    return this.phoneNo;
  }

  public getVehicleNumber() {
    return this.vehicleNumber;
  }

  public hasUserLicense() {
    return this.hasLicense;
  }
}
