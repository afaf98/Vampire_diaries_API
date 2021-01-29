- [x] Pagination for /episodes
- [x] Error handling for the various database calls
- [x] Params validation -> yup approach
- [x] Simplify to just /characters (characters & actors) or actors (name / episode count)
- [x] Add validation to limit and offset
- [x] same validation function for queries and params
- [x] GET /episodes?title=pilot
- [x] Write proper test for the /episodes route
- [x] GET /episodes?sortBy=USviewers
- [ ] Check if the user insert the right query
- [x] Install httpie
- [ ] Post request to /user with email
- [ ] Validate email
- [ ] Create table user
- [ ] Insert User

Future ideas

// -> title.includes(pilot) but sequelize
GET /season/:id/episode/:nSeason

//Caching

//Goal : See if the user with an apiKey exist
//If the user exist for the next minute if they send another request with the same key
// we will assume that is valid without checking the db
// If they make another request with the same key after a minute we will check the db again

- [x] If a key is valid store it in an object
      aa3ef868-ceed-4ca2-9d24-eeda72c233b2
- [x] Store the time when we last checked the db
- [x] If a request is made check the cache before making a db call
- [x] If we found a key in the cache and if the last time we checked the db was less than a minute ago authorize it
- [x] If we found the key in the cache but the last time we checked was more than a minute ago, delete the key from the cache and check the db again
- [x] Every five minutes check the entire cache and clean all expired keys
