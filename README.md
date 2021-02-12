# The Vampire diaries API

The Vampire Diaries API permits you to collect data from the famous series,
like the seasons, episodes and character that are present in it.

## [Request an Apikey and explore the API here (Vampire emoji)](Netlify)

- This is the base Url (You need an ApiKey first!)-> [heroku](heroku)

### Table of contents

- [Scraper repo](#Scraper-repo)
- [Frontend repo](#Frontend-repo)
- [Backend repo](#Backend-repo)
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
