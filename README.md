# TinyApp by Val

TinyApp is a full stack web application built with EJS as a templating engine and Node and Express that allows users to shorten long URLs (à la bit.ly).

## Getting Started

- This app is running in **node and nodejs v12.22.2**
- `git clone git@github.com:ValEmpire/tinyapp.git tinyApp`
- `cd tinyApp`
- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run dev` command.

## Final Product

#### You can view the production in heroku. [LIVE](https://tinyurlval.herokuapp.com/)!

![alt text](https://raw.githubusercontent.com/ValEmpire/files/main/login.png "Logo Title Text 1")

## Test

This app was tested using mocha, chai and chai-as-promised.

## Dependencies

    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cookie-session": "^1.4.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-ejs-layouts": "^2.5.1",
    "method-override": "^3.0.0",
    "morgan": "^1.10.0"

## devDependencies

    "chai": "^4.3.4",
    "chai-as-promised": "^7.1.1",
    "mocha": "^9.1.1",
    "nodemon": "^2.0.12"

## Routes

#### GET

- `/` redirects to `/login` route.
- `/login` renders login view. Logged in user will be redirected to `/urls` route.
- `/registration` renders registration view. Logged in user will be redirected to `/urls` route.
- `/u/:shortURL` redirects to longURL if found else redirect to 404 view.

##### Authenticated Routes - Not logged in user will be redirected to `/login`

- `/urls` renders urls_index view.
- `/urls/new` renders urls_new view.
- `/urls/:shortURL` renders urls_show view with visitors count, unique visitors and total visits. Renders 404 view if `shortURL` is not found.

#### POST

- `/login` {email, password} required. Throws and display error if any. Save userID cookie as session. Redirects to `/urls` if successful.
- `/registration` {email, password} required. Throws and display error if found. Save userID cookie as session. Add new user to users db. Redirects to `/urls` if successful.
- `/logout` clears all cookies and sessions. Redirects to `/login`.

##### Authenticated Routes - Unauthorized user will be redirected to `/login`

- `/urls` {longURL} required. Throws and display error if any. Add new url to urls db. Return to `/urls` with a successful message if successful.

#### PUT

##### Authenticated Routes - Unauthorized user will be redirected to `/login`

- `/urls:key` {longURL} required. Update the `key` params if user is the owner of the url. Throws and display error if any. Return to `/urls` with a successful message if successful.

#### DELETE

##### Authenticated Routes - Unauthorized user will be redirected to `/login`

- `/urls:key` {longURL} required. Delete the `key` params if user is the owner of the url. Throws and display error if any. Return to `/urls` with a successful message if successful.

## Future update

- Will connects to MongoDB
- Will add nodemailer for email registration and verification
- Will add use 3rd party authentication
- Will test all endpoints using supertest
