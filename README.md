# Petspace Server

- install necessary packages

  - express
  - nodemon
  - cors
  - dotenv
  - knex
  - mysql2
  - uuid

- created folder structure and added placeholder files for github to keep the structure intact

## Develop Branch

- create develop branch
- created knexfile.js

### Initial Migrations

- created initial migrations for:
  - account table
  - user table
  - sitter table
  - sitter_bridge table
  - user_pets bridge table
  - pet table
- created and updated account table (change reflected in DrawSQL file for db layout)
  - removed role column
  - renamed password column to passwordHash
  - added passwordSalt column
- created user table
- created sitter table
- created sitter_bridge table
- created user_pet bridge table
- created pet table
- debugged migrations
- complete migrations file debugging

### Initial Seed files

-
