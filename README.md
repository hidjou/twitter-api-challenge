# Twitter API playground

## Build the application

1- Copy the pastebin contents (from email) to a `.env` file

2- Update the the DB connection, database, host, username and password to connect to your local / server DB system (make sure the DB is created)

3- run `composer install` to install all PHP dependencies

4- run `npm install` to install JS dependencies

5- run `php artisan migrate` to create the DB tables

6- run `php artisan tokens:generate-token` to generate and store a bearer token to use for API calls

7- run `npm run prod` to build out the JS and CSS files and move needed dependencies

## Run it

run `php artisan serve` and browse to the given port

(Alternatively, you can set up a vitrual host and point it to the public directory of thie app)

## Test it

if you're using a virual host, change the `app` value in `resources/js/TweetFeed/App.test.js` and skip step 1

1- run `php artisan serve` (if it runs on a port other than 8000 then please edit `app` in `resources/js/TweetFeed/App.test.js`)

2- run `npm test`

## Tech used

-   Back-end: PHP, Laravel
-   DB: SQL (I used MySQL, but SQLite, MS SQL and Postgres can all work)
-   Front-end: JS using React, Bootstrap for UI, SCSS for custom CSS
-   Testing: Jest + Puppeteer for UI/E2E tests
