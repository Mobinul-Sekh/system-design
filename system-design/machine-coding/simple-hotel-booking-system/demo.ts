import { HotelManagementService } from ".";

const hotel1Id = `hotel-${Math.random()*1e6}-${Date.now()}`;
const hotel2Id = `hotel-${Math.random()*1e6}-${Date.now()}`;

const hotelManagementService = new HotelManagementService();
// list hotels.
hotelManagementService.addHotel(hotel1Id, "FamilyOHotel", 10);
hotelManagementService.addHotel(hotel2Id, "LoveOHotel", 3);


// user searches by name
const specificHotel = hotelManagementService.searchHotelsByName("family");
console.log("specificHotel -> ", specificHotel);

const booked = hotelManagementService.bookHotelRooms(hotel1Id, 3,"user-1");
console.log("Booking Successful -> ", booked.success);

// user searches for hotels
const hotels = hotelManagementService.hotelLists();
console.log("all hotels -> ", hotels);

const isCancelled = hotelManagementService.cancelBooking(booked.bookingId);
console.log("Cancellation Successful -> ", isCancelled);

// user searches for hotels
console.log("all hotels -> ", hotels);