- Goals
  - Public api
  - Learning goals
  - Scrape & Normalize data
  - Build a rest api w. database
  - e2e test rest api
  - validate incoming requests
  - sending emails
  - simple react
  - custom hook & context
  - Bootstrap
  - Continuous integration / Continuous deployment 
  - Github actions run e2e tests
  - Heroku auto deploy / Netlify auto deploy
  - Main / Dev / Feature git flow
-  Api Docs 
  - Send them to the explorer
  - Request a key
  - Routes & params
  - Status
- Roadmap
  - What is next? -> board
- Additional resources (wireframe, db, board)
- Author
# The Vampire Diaries API 🧛

The Vampire Diaries API permits you to collect data from the famous series,
like the seasons, episodes and character that are present in it.

## [🧛 Request an Apikey and explore the API here 🧛 ](https://vampire-diaries-api.netlify.app/)

- This is the base Url (You need an ApiKey first!)
  - [https://vampire-diaries.herokuapp.com/api](https://vampire-diaries.herokuapp.com/api/)

### Table of contents

- [Scraper repo](#Scraper-repo)
- [Frontend repo](#Frontend-repo)
- [Backend repo](#Backend-repo)
- [Goals](#Goals)
- [User Stories](#User-Stories)
- [Api Docs](#Api-Docs)

### [Scraper repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/scraper)

The Scraper repository contains how we get the data and how we normalize them, in order to insert the information scraped in the database.

- [Scraper repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/scraper)

### [Frontend repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/client)

Here you can find the API explorer, created with ReactApp, where you can request data if you are in posses of a key.
You may also request one in the form at the end of the page

- [Frontend repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/client)

### [Backend repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/server)

This repository contains how the database is structured and the end to end test created to make sure that the App is working properly even with changes.

- [Backend repo](https://github.com/afaf98/Vampire_diaries_API/tree/development/server)


# Goals

The main Goal of this project was to create an open source api that allow you to collect data from a specific TV show that is called The Vampire Diaries.


# The learning goals in this project are the following :

 - ## Scrape & Normalize data

  All the data in this API has been scraped from a website.
  That allowed us to create a good amount of data to build this project. 

  - [Scraper Folder](https://github.com/afaf98/Vampire_diaries_API/tree/development/scraper)
 
 - ## Build a rest API with database

To accomplish our aim we've start building a Rest API, by creating different databases (Development/Testing/Production) with Sequelize and Postgres.
All the releations of the tables has been defined and implemented.
It has been implemented an Express server that allowed us to create different routes by following the Rest rules. 

  - [Server Folder](https://github.com/afaf98/Vampire_diaries_API/tree/development/server)

  - ## End to end test rest api

To make sure our app works and keeps working in the proper way, we've implemented a testing section.
For the testing we've installed Supertest and Jest, that allowed us to create end to end testing.

  - [Testing files](https://github.com/afaf98/Vampire_diaries_API/tree/development/server/test)

  -  ## Validate incoming requests

  Each request has been validated by using a library [Yup](https://www.npmjs.com/package/yup).
  Validation was an important step to make sure that the app works properly and to give a the right feedback to the user.

  - [Validation example](https://github.com/afaf98/Vampire_diaries_API/tree/development/server/validation)

  
  - ## Sending emails

Our API requires an Api Key, that allows the user to use all the routes available.
To request a key we've created an POST request that sends an email to the new User with the personal key.
For this functionality we've used [SendGrip](https://www.npmjs.com/package/@sendgrid/mail)

- [Example sending email](https://github.com/afaf98/Vampire_diaries_API/blob/1ae705c6d2c636874eefbffae34232d615f795a2/server/sendEmail.js)

## Simple React-App

To build our frontend we've decided to use React app that allowed us to create different components and build a simple app.

For the styling we've decided to use a [Bootstrap](https://getbootstrap.com/) with some customization applied with CSS
  - custom hook & context
  - Bootstrap
  - Continuous integration / Continuous deployment 
  - Github actions run e2e tests
  - Heroku auto deploy / Netlify auto deploy
  - Main / Dev / Feature git flow

### User Stories

- As a User I want to be able to fetch the sesaons/episodes and charachters from the API
- As a User I want to be able to sort the data by ascending or descending order
- As a User I want to be able to fetch the data with a precise limit/offset
- As a User I want to be able to request an ApiKey
- As a User I want to be able to Query the database to find specific data

### Api Docs

#### Here you can find the routes that you can use for this API

- ### /api/episodes?key=[YOUR API Key]
  - Get all the episode of the Vampire Diaries Series
- ### /api/seasons?key=[YOUR API Key]
  - Get all the seasons
- ### /api/charachters?key=[YOUR API Key]
  - Get all the actors and characters present in the series
- ### /api/episodes?key=[YOUR API Key]&sortBy=USviewers
  - Get all the episodes in DESC order in base of how many people watched the episodes
  - You may also decide in wich order you want to fetch the data
    - For example : /api/episodes?key=[YOUR API Key]&sortBy=USviewers&sortOrder=DESC
      or /api/episodes?key=[YOUR API Key]&sortBy=USviewers&sortOrder=ASC
- ### /api/seasons?key=[YOUR API KEY]&limit=20&offeset=0
  - This route can be used also with the characters and the episodes, and it allow you to define a limit and an offset
- ### /api/episodes/:id?key=[YOUR API Key]
  - This route allows you to find a precise episode/seasons/character, by giving a specific ID
- ### /api/seasons/:seasonId/episodes?key=[YOUR API Key]
  - This route allow you to find all the episodes of a specific season
- ### /api/actors?key=[YOUR API Key]

  - This route allows you to fetch just the actors present in this series

  ## Author

  - Afaf Ibrahimi
  - [https://github.com/afaf98](https://github.com/afaf98)
