# Notes

## The Essence of Express Development: the Request/Response Cycle

- Everything is middleware (even routers)
- Other examples include functions that parse the body, log, set headers, route
- All middleware is part of middleware stack

## Configure ESLint and Prettier

- npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

## What is Mongoose, and Why Use It

- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, a higher level of abstraction
- Allows users to write JS code to interact with Mongo
- Rapid and simple development of MongoDB database interactions
- Features:
  - Schemas to model data and relationships, easy data validation, simple query API, middleware
  - Mongoose schema: where we model our data, by describing the structure of the data, default values, and validation
  - Mongoose model: a wrapper for the schema, providing an interface to the databse for CRUD operations

## Application vs Business Logic

- Application (controller)
  - Code that is only concerned about the application's implementation, not the underlying business problem we're trying to solve (e.g. showing and selling tours)
  - Concerned about managing requests and responses
  - About the app's more technical aspects
  - Bridge between model and view layers
- Business (model)
  - Code that actually solves the business problem we set out to solve
  - Directly related to business rules, how the business works, and business needs
  - Examples:
    - Creating new tours
    - Checking if user's password is correct
    - Validating user input data
    - Ensuring only users who bought a tour can review it
- Fat models/thin controllers: offload as much logic as possible into the models, and keep the controllers as simple and lean as possible

## Json Web Tokens

- stateless solution for authentication

## Security Best Practices

-
