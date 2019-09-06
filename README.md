# Earthbound

## Description

- This repository contains a hiking photography web app using Node, Express and MongoDB

## Learning Objectives

MVC Architecture

### Controller

- Create RESTful API endpoints using Express framework
- Understand Express's request/response cycle
- Use third-party middleware such as morgan.js for logging
- Chain custom middleware to validate input from users
- Utilize environmental variables to switch between development/production
- Handle CRUD (create, read, update, destroy) operations
- Use Postman in development workflow to test APIs
- Write NodeJs scripts to import/delete models from database
- Make API querying better by implementing the following options:
  - filtering
  - sorting
  - limiting fields
  - pagination
  - aliasing
- Debug with NDB
- Handle all potential errors in application:
  - Bad paths
  - Invalid database IDs
  - Duplicate database fields
  - Mongoose validation errors
  - Unhandled rejections
  - Uncaught exceptions
- Authenticate users and manage passwords
  - Encrypt passwords in database with bcrypt hashing function
  - Exchange Json Web Tokens for stateless authentication
  - Protect routes with middleware that validate Bearer headers
  - Users should not have access to routes if:
    - they are not logged in
    - jwt token is invalid
    - token payload has been manipulated
    - user recently changed password after token was established
  - Reset forgotten passwords through Nodemailer
  - Allow user to update passwords and deactivate accounts
  - Send HTTPOnly cookies along with JWTs
  - Set rate limiting with express-rate-limit library
  - Use helmet to set security HTTP Headers
  - Sanitize data to prevent NoSQL query injections/Cross-Site Scripting attacks
  - Prevent parameter pollution

### Models

- Manage models with MongoDB/Compass
  - Import local database to hosted cluster with Mongo Atlas
- Add ODM (Object Data Modeling) layer of abstraction with Mongoose
  - Build mongoose schemas and models
- Separate application logic and business logic
- Implement "fat models/thin controllers" strategy
- Use aggregation pipelines to get insight about data
  - Matching
  - Grouping
  - Unwinding
  - Projecting
- Define virtual properties on schemas
- Utilize document/aggregation middleware to control flow of data
- Use built-in and custom validators
- Define roles for different types of users

### Views

- ...

## Requirements

- All files are created and compiled on Mac OS X 10.11 with NodeJS 10.16.3
- JS files are linted for syntax and styile with Prettier and ESLint
- NPM 6.9

## Installation

```js
npm install
npm run start
```

## Author

- **Tu Vo** - [tuvo1106](https://github.com/tuvo1106)
