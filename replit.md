# replit.md

## Overview

This is a learning/practice repository focused on system design concepts implemented in TypeScript. It contains two main areas of study:

1. **Design Patterns** - Implementations of classic design patterns in TypeScript (e.g., Strategy Pattern via the "WhatTheDuck" example)
2. **Machine Coding** - Low-level design exercises like a simple hotel booking system

The project is not a production application — it's a sandbox for exploring software architecture concepts through code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Project Structure

```
system-design/
├── design-patterns-in-ts/     # Design pattern implementations
│   ├── WhatTheDuck/           # Strategy Pattern example (Head First Design Patterns style)
│   │   ├── interfaces/        # Behavior interfaces (FlyBehavior, QuackBehavior)
│   │   ├── duck.ts            # Abstract Duck class
│   │   └── mallardDuck.ts     # Concrete duck (empty/WIP)
│   └── index.ts               # Entry point (empty)
├── machine-coding/
│   └── simple-hotel-booking-system/
│       ├── index.ts           # Core classes: Hotel, Room, Booking, HotelManagementService
│       └── demo.ts            # Demo script showing usage
└── README.md
```

### Runtime & Language

- **Language**: TypeScript with strict mode enabled
- **Runtime**: Node.js with ESM modules (`"type": "module"` in package.json)
- **Execution**: Uses `tsx` for running TypeScript files directly without a build step
- **Target**: ESNext for both compilation target and module system
- **No build output**: `noEmit: true` in tsconfig — TypeScript is used purely for type-checking, execution handled by tsx

### Design Patterns

The "WhatTheDuck" example follows the **Strategy Pattern** from "Head First Design Patterns":
- Behaviors (fly, quack) are extracted into interfaces
- Duck subclasses compose behaviors rather than inheriting them
- This is a work-in-progress — the abstract Duck class and interfaces are partially defined

### Machine Coding - Hotel Booking System

The hotel booking system demonstrates low-level design with these entities:
- **Hotel** — Has an ID, name, and available room count
- **Room** — Has a status (AVAILABLE/OCCUPIED), linked to a hotel and optionally a booking
- **Booking** — Links users to hotel rooms
- **HotelManagementService** — Facade that handles hotel CRUD, search, booking, and cancellation

Key design decisions:
- In-memory data storage (no database)
- Service-oriented architecture with a single management service class
- Enum-based room status tracking
- ID generation uses random numbers and timestamps

### Current State

Several files are works-in-progress or empty:
- `duck.ts` has a syntax error (`publi` instead of `public`)
- `mallardDuck.ts` and `design-patterns-in-ts/index.ts` are empty
- The hotel booking system's `index.ts` appears truncated

## External Dependencies

### Runtime Dependencies
| Package | Purpose |
|---------|---------|
| `node-fetch` (^3.3.1) | HTTP fetch API for Node.js (ESM-only version) |

### Dev Dependencies
| Package | Purpose |
|---------|---------|
| `@types/node` (^20.10.0) | TypeScript type definitions for Node.js |
| `tsx` (^4.7.1) | TypeScript execution engine — runs .ts files directly |

### No External Services
- No database — all data is in-memory
- No external APIs consumed
- No authentication system
- No third-party service integrations