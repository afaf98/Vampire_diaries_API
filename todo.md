- [ ] Pagination for /episodes
- [x] Error handling for the various database calls
- [ ] Params validation -> yup approach
- [x] Simplify to just /characters (characters & actors) or actors (name / episode count)

Future ideas

GET /episodes?title=pilot // -> title.includes(pilot) but sequelize
GET /episodes?sortBy=USviewers
GET /season/:id/episode/:nSeason
