# Backend System: Citizan participation platform in city's budget - Twój Głos.

## Project Overview
A sophisticated NestJS backend for a civic engagement platform that enables citizens to propose, vote on, and track community development projects. The system handles user management, project lifecycle, and real-time voting with enterprise-grade architecture.

## Technical Stack & Advanced Solutions
- **Modern Framework**: NestJS with TypeScript for robust, scalable backend development
- **Database ORM**: Prisma with PostgreSQL for type-safe database operations and migrations
- **Security Implementation**: bcrypt hashing with salt rounds for password protection
- **RESTful API Design**: Clean, structured endpoints with proper HTTP status codes
- **Middleware Integration**: Cookie-parser for session management

## Key Technical Achievements

### 🔐 Advanced Authentication System
- Secure login with multiple identity options (email/phone)
- Session-based authentication with cookie storage
- Data privacy protection through phone number masking
- Duplicate user detection during registration

### 🏗️ Project Management Engine
- Geolocation support with coordinate mapping (lat/lng)
- Advanced search functionality with phrase matching
- Project approval workflow for administrative control
- Real-time vote counting and validation

### 🗳️ Sophisticated Voting Mechanism
- Anti-duplication voting system with transaction safety
- Vote tracking through relational database design
- Atomic vote increments to prevent race conditions

### ⚙️ Scalable Architecture
- **Repository Pattern**: Clean separation between business logic and data access
- **DTO Validation**: Type-safe data transfer objects for all endpoints
- **Modular Design**: Easily extensible service layer
- **Error Handling**: Comprehensive exception management with custom HTTP exceptions

## Professional Development Practices
- **TypeScript Implementation**: Full type safety across the application
- **Dependency Injection**: NestJS built-in IoC container for testable code
- **API Versioning Ready**: Structured for future scalability
- **Database Transactions**: Proper data consistency in multi-operation processes

## Business Logic Complexity
- Multi-role user system (citizens vs government users)
- Project lifecycle management from creation to approval
- Location-based project filtering and categorization
- User preference system with theme persistence
