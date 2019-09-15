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

Problems/Solution

- Compromised database
  - Strongly encrypt passwords with salt and hash (bcrypt)
  - Strongy encrypt password reset tokens (SHA 256
- Brute force attacks
  - Use bcrypt (make login request slow)
  - Implement rate limiting (express-rate-limit)
  - Implement maximum login attempts
- Cross-site Scripting (XSS) Attacks
  - Store JWT in HTTPOnly cookies
  - Sanitize user input data
  - Set special HTTP headers (helmet package)
- Denial-of-service (DOS) attack
  - Implement rate limiting
  - Limit body payload (in body-parser)
  - Avoid evil regular expressions
- NoSQL query injection
  - Use mongoose for MongoDB (because of SchemaTypes)
  - Sanitize user input data

Other Best Practices

- Always use HTTPS
- Create random password reset tokens with expiry dates
- Deny access to JWT after password change
- Don't commit sensitive config data to Git
- Don't send error details to clients
- Prevent Cross-Site Request Forgery (csurf package)
- Require re-authentication before a high-value action
- Implement a blacklist of untrusted JWT
- Confirm user email address after first creating account
- Keep user logged in with refresh tokens
- Implement two-factor authentication
- Prevent parameter pollution causing Uncaught Exceptions

## NoSQL Injection

```json
{
  "username": { "$gt": "" },
  "password": "<common_password>"
}
```

## Data Modeling

- Different types of relationships between data
- Referencing/normalization vs embedding/denormalization
- Embedding or referencing other documents
- Types of referencing
- Relationships:
  - 1:1
  - 1:many
    - 1:few
    - 1:many
    - 1:ton
  - many:many
- Referencing/normalized: relationships are referenced by ID (child referencing)
- Embedded/denormalized: embed documents in main documents
  - Performance: we cna get all the info in one query
  - Impossible to query the embedded document on its own
- When to embed and when to reference? A Practial framework

  - Relationship type (how two datasets are related to each other)
    - embed: 1:few, 1:many
    - ref: 1:many, 1:ton, many:many
  - Data access patterns (how often data is read/written)
    - embed: data is mostly read, data does not change quickly, high read/write ratio
    - red: data is updated a lot, low read/write ratio
  - Data closeness (how much the data is related)
    - embed: datasets really belong together
    - red: we frequently need to query both datasets on their own
  - Three different types of referencing
    - Child referencing
      - array of IDs
      - 1:few
    - Parent referencing
      - child always knows its parent; not other way around
      - 1:many, 1:ton
    - Two-way referencing
      - many:many
  - Summary:

    - Structure your data to match the ways that your application queries and update data
    - Identify the questions that arise from your application's use cases first, and then model your data so that the questions can get answered in the most effecient way
    - In general, always favor embedding, unless there is a good reason not to embed. Especially on 1:few and 1:many
    - A 1:ton or a many:many relationship is usually a good reason to reference instead of embedding
    - Also, favor referencing when data is updated a lot and if you need to frequently access a dataset on its own
    - Use embedding when data is mostly read but rarely updated, and when two datasets belong intrinsically together
    - Arrays should never be allowed to grow indefinitely (16 mb limit)
    - Use two-way referencing for many:many relationships
      ...

## HEROKU

- heroku login
- heroku create
- git push heroku master
- heroku open
- heroku logs
- heroku config:set <KEY>=<VALUE>
- heroku apps:rename earthbound
- heroku ps
- heroku ps:restart
