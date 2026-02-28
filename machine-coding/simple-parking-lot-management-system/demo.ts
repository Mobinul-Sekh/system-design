import { ParkingLotAdmin } from "./admin";
import { ParkingLotAdminSystem } from "./admin-system";
import { ParkingLotManagementSystem } from "./management-system";
import { ParkingArea, SecurityEnum } from "./parking-area";
import { ParkingBlock, VahicleTypeEnum } from "./parking-block";
import { User } from "./user";
import { Vahicle } from "./vahicle";

// configuring admin.
const admin = new ParkingLotAdmin("007", "Jamil");
const adminManagementSystem = new ParkingLotAdminSystem();
adminManagementSystem.createAdmin(admin);

// validation admin
adminManagementSystem.isValidAdmin(admin.adminId);

// admin operations

// listing new parking area
const parkingArea = new ParkingArea(
  "0001",
  "0001Kol",
  "Kolkata",
  SecurityEnum.HIGH,
  4,
);
adminManagementSystem.addNewParkingArea(parkingArea);

// listing parking blocks.
adminManagementSystem.addNewBlockInParkingArea(
  "0001",
  new ParkingBlock("0001LOT", VahicleTypeEnum["2-WHEEL"], 100),
);

adminManagementSystem.addNewBlockInParkingArea(
  "0001",
  new ParkingBlock("0002LOT", VahicleTypeEnum["4-WHEEL"], 20),
);

// vahicle that is looking to park.
const vahicle = new Vahicle("VAH786", VahicleTypeEnum["4-WHEEL"]);

// driver who is driving the vahicle.
const driver = new User("Mobinul", "9524345434", true, vahicle.vahicleNumber);

// configuring parking management system.
const parkingManagementSystem = new ParkingLotManagementSystem(
  vahicle,
  driver,
  parkingArea,
);

// operations
const confirmationToken = parkingManagementSystem.processParking();

if (!confirmationToken) {
  throw new Error("Please show your confirmation token to proceed");
}

parkingManagementSystem.processDeparting(confirmationToken.parkedBlockNumber);

// FUTURE SCOPE.
// add confirmation token service separately.
// add the payment service.
