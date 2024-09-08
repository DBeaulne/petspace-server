# Petspace Server project

This is the server project file for PetSpace, a portal to connect users to sitters in their area.
This server file containes the endpoint for creating accounts, users, and pets.

### Limitations

- There is no logic to create sitters
- There is no logic to join users to their pets
- The openai endpoint is currenlty orphaned as that is a work in progress

## Setup

1.  `$ git clone git@github.com:DBeaulne/petspace-server.git`
2.  `$ cd petspace-server`
3.  `$ npm install`
4.  Open your mySQL editor and create a new schema in your connected server. Give it the name of petspace (all lower case)
5.  make a copy of the .env.sample file. Renmae it to .env and add all the environment variables.
6.  `$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` to create an access token. Copy this into your .env file for the ACCESS_TOKEN_SECRET.

    - run the above command a second time for your REFRESH_TOKEN_SECRET

7.  `$ npm start`
8.  split your bash terminal and then `$ npm run migrate`
9.  `$ npm run seed`
10. The server is now ready for the client
