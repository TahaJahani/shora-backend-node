# Web-HW2 Back-End
This backend is written in JS using Express framework.
To run this project, be sure to have `npm` or `yarn` installed. Then run this command:
`npm install`
and wait for the dependencies to install. Afterwards, just run the command below:
`npm start`
Now you can access the backend routes on `localhost:3000`

## Migrations and Database
To have your database ready, create a `.env` file, and fill that with the information like provided in `.env.example`.
After that, run this command:
`npx sequelize-cli db:migrate`
and all the required tables will be ready!

## Seeding
Your system should have one admin user. to add this user run the command:
`npx sequelize-cli db:seed:all`
A user with username `admin` and password `admin` will be added to database. This user has the ability to see and edit all notes.