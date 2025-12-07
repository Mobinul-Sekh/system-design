// Actors -> Admin, User, System.
// Functions -> 
  // 1. Admin(addHotels, removeHotels, changeHotelStatus)
  // 2. User(searchHotels, listAllHotels, bookHotel, cancelBooking)
  // 3. System(manageBooks, manageCancellation, checkAvailability)

// Entities ->
  // Hotel(hotelId, hotelName, roomAvailable)
  // Room(roomId, roomStatus["AVAILABLE", "UNAVAILABLE"], hotelId(f_key))
  // User(userId, userName)
  // Booking(bookingId, hotelId(f_key), userId(f_key), roomsNeeded, roomIds[])


class Hotel {
  id: string;
  name: string;
  private roomAvailable: number;

  constructor(id: string, name: string, roomAvailable: number) {
    this.id = id;
    this.name = name;
    this.roomAvailable = roomAvailable;
  }

  availableRoomCount(): number {
    return this.roomAvailable;
  }

  setRoomCount(roomCount: number): void {
    this.roomAvailable = roomCount;
  }
}

enum RoomStatus {
  available = "AVAILABLE",
  occupied = "OCCUPIED"
}

class Room {
  id: string;
  status: RoomStatus = RoomStatus.available;
  hotelId: string;
  bookingId?: string;

  constructor(id: string, hotelId: string) {
    this.hotelId = hotelId;
    this.id = id;
  }

  isRoomAvailable(): boolean {
    return this.status == RoomStatus.available;
  }
}

class User {
  id: string;
  userName: string;

  constructor(id: string, userName: string) {
    this.id = id;
    this.userName = userName;
  }
}

class Booking {
  id: string;
  hotelId: string;
  userId: string;
  roomsNeeded: number;

  constructor(id: string, hotelId: string, userId: string, roomsNeeded: number) {
    this.id = id;
    this.hotelId = hotelId;
    this.roomsNeeded = roomsNeeded;
    this.userId = userId;
  }
}

export class HotelManagementService {
  private hotels: Map<string, Hotel> = new Map();
  private rooms: Map<string, Room> = new Map();
  private bookings: Map<string, Booking> = new Map();

  // Admin functions.
  addHotel(id: string, name: string, roomAvailable: number): void {
    if (this.hotels.has(id)) {
      throw new Error("Hotel already listed!");
    }
    // add hotel to db.
    const hotel: Hotel = new Hotel(id, name, roomAvailable);
    this.hotels.set(id, hotel);

    // create rooms entry.
    for (let i=0; i<roomAvailable; i++) {
      let roomId = `${Math.random()*1e6}-${Date.now()}`;
      const room = new Room(roomId, id);
      this.rooms.set(roomId, room);
    }
  }

  // De-list a hotel.
  deleteHotel(id: string): Record<string,string> {
    const hotel = this.hotels.get(id);
    if (!hotel) {
      throw new Error("Hotel does not exist");
    }

    this.hotels.delete(id);
    return {
      message: `${hotel.name} has being deleted`
    }
  }

  // update room status.
  makeRoomAvailable(hotelId: string, roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    room.status = RoomStatus.available;
    this.rooms.set(roomId,room);

    const hotel = this.hotels.get(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    const currRoomCount = hotel.availableRoomCount();
    hotel.setRoomCount(currRoomCount+1);
    this.hotels.set(hotelId, hotel);
  }

  // utility function for fetching available rooms for a hotel
  getAvailableRoomsByHotelId(hotelId: string): Room[] {
    let rooms: Room[] = [];

    // find available rooms of that hotel
    for (const room of this.rooms.values()) {
      if (room.hotelId === hotelId && room.isRoomAvailable()) {
        rooms.push(room);
      }
    }

    return rooms;
  }

  // User Functions.
  bookHotelRooms(hotelId: string, roomsNeeded: number, userId: string): Record<string, any> {
    const hotel = this.hotels.get(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    const roomsAvailable = hotel?.availableRoomCount();
    if (roomsNeeded > roomsAvailable) {
      throw new Error("Enough rooms are not available");
    }

    // entry add to booking table.
    const bookingId = `booking-${Math.random()*1e6}-${Date.now()}`;
    const booking = new Booking(bookingId, hotelId, userId, roomsNeeded);
    this.bookings.set(bookingId, booking);

    const rooms = this.getAvailableRoomsByHotelId(hotelId);

    if (roomsNeeded > rooms.length) {
      throw new Error("Hotel does have enough available rooms");
    }

    // update rooms table
    for (let i=0; i<roomsNeeded; i++) {
      rooms[i].status = RoomStatus.occupied;
      rooms[i].bookingId = bookingId;
      this.rooms.set(rooms[i].id, rooms[i]);
    }

    // update hotel table
    hotel.setRoomCount(roomsAvailable-roomsNeeded);
    this.hotels.set(hotelId, hotel);

    return {
      success: true,
      bookingId: bookingId
    };
  }

  cancelBooking(bookingId: string): boolean {
    const booking = this.bookings.get(bookingId);
    if (!booking) return false;

    // get booked rooms
    let bookedRooms: Room[] = [];
    for (const room of this.rooms.values()) {
      if (room.bookingId === bookingId) {
        bookedRooms.push(room);
      }
    }

    // update the status to available
    for (const room of bookedRooms) {
      room.status = RoomStatus.available;
      this.rooms.set(room.id, room);
    }

    // update the hotel table also
    const hotel = this.hotels.get(booking.hotelId);
    if (!hotel) return false;

    const roomsAvailable = hotel.availableRoomCount();
    hotel.setRoomCount(roomsAvailable + bookedRooms.length);

    return true;
  }

  hotelLists(): Hotel[] {
    return Array.from(this.hotels.values());
  }

  searchHotelsByName(name: string): Hotel[] {
    const q = name.toLocaleLowerCase();
    return this.hotelLists().filter((hotel) => hotel.name.toLocaleLowerCase().includes(q));
  }
}