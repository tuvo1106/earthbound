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
- Use Postman in development workflow
- Write NodeJs scripts to import/delete models from database
- Make API querying better by implementing the following options:
  - filtering
  - sorting
  - limiting fields
  - pagination
  - aliasing

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
- Create document middleware

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
