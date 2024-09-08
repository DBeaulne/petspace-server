# Petspace Server project

## Setup

1.  `$ git clone git@github.com:DBeaulne/petspace-server.git`
2.  `$ cd petspace-server`
3.  `$ npm install`
4.  Open your mySQL editor and create a new schema in your connected server. Give it the name of petspace (all lower case)
5.  create .env file using the .env.sample file and add the required conditions.
6.  `$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` to create an access token. Copy this into your .env file for the ACCESS_TOKEN_SECRET.

    - run the above command a second time for your REFRESH_TOKEN_SECRET

7.  `$ npm start`
8.  split your bash terminal and then `$ npm run migrate`
9.  `$ npm run seed`
10. The server is now ready for the client

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

- generate seed files
- edited seed files to locate users and sitters in Durham Region of Ontario

### Routes

- create routes for
  - accounts: for account related actions
  - user: for user related actions
  - pet: for pet related actions
  - sitter: for sitter related actions
  - map: for google maps related actions
  - login: for user login related actions

### Controllers

- create controllers for
  - account-controller: endpoints for accounts table functions
  - user-controller: endpoins for user table functions
  - sitter-controller: endpoints for sitter and sitter-bridge table functions
  - pet-controller: endpoints for pet and pet-bridge table functions
  - map-controller: endpoints for google maps functions
  - login-controller: endpoints for user login functions

### OpenAI

- import openai package
- add findSitters endpoint to search for sitters based on availabilty, then pet_types to sit, sorted by distance
- the OpenAI chat functionality is still a work in progress
