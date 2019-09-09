# Earthbound

## Description

- This repository contains a hiking photography web app using Node, Express and MongoDB

## Learning Objectives

MVC Architecture

### Controller

- Create RESTful API endpoints using the Express framework
- Understand Express's request/response cycle
- Use logging middleware such as morgan.js
- Chain custom middleware to validate requests from users
- Utilize environmental variables to switch between development/production
- Handle all CRUD (create, read, update, destroy) operations
- Use Postman in development workflow to test APIs
- Write NodeJs scripts to import/delete models from database
- Improve API querying by implementing the following features:
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
- Prevent parameter pollution in API requests
- Implement nested routes using Express's mergeParams
- Create factory functions to standardize CRUD operations
- Make geospatial queries with latitude/longitude fields

### Models

- Manage models with MongoDB/Compass
  - Import local database to hosted cluster with Mongo Atlas
- Add ODM (Object Data Modeling) layer of abstraction with Mongoose
  - Build mongoose schemas and models
- Implement "fat models/thin controllers" strategy
- Use aggregation pipelines to get insight about data
  - Matching
  - Grouping
  - Unwinding
  - Projecting
- Define virtual properties on schemas
- Utilize document/aggregation middleware to control flow of data
- Use built-ins and custom validators
- Define roles for different types of users
- Embed geospatial properties into existing documents
- Reference other documents via populate()
  - Implement virtual populating when necessary
- Improve read performance with custom indexes

### Views

- Use pug.js as template library
  - Dynamically load data from API
  - Use builtins such as loops, conditionals and mixins
- Embed an interactive map in front-end with Mapbox
  - Set custom markers for tour locations
- Verify if users are logged by checking broswer cookies
- Manage javascript assets with web application bundler like Parcel

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
