- [x] Pagination for /episodes
- [x] Error handling for the various database calls
- [x] Params validation -> yup approach
- [x] Simplify to just /characters (characters & actors) or actors (name / episode count)
- [x] Add validation to limit and offset
- [x] same validation function for queries and params
- [x] GET /episodes?title=pilot // -> title.includes(pilot) but sequelize

Future ideas

GET /episodes?sortBy=USviewers
GET /season/:id/episode/:nSeason
