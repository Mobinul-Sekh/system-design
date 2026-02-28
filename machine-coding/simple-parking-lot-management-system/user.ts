export class User {
  name: string;
  phoneNo: string;
  hasLicense: boolean;
  vahicleNumber: string;

  constructor(
    name: string,
    phoneNo: string,
    hasLicense: boolean,
    vahicleNumber: string,
  ) {
    this.name = name;
    this.phoneNo = phoneNo;
    this.hasLicense = hasLicense;
    this.vahicleNumber = vahicleNumber;
  }

  public getUserName() {
    return this.name;
  }

  public getUserPhoneNo() {
    return this.phoneNo;
  }

  public getVahicleNumber() {
    return this.vahicleNumber;
  }

  public hasUserLicense() {
    return this.hasLicense;
  }
}
