const request = require("supertest");
const app = require("../app");
const db = require("../models");

const server = request(app);

describe("api", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("test apikey", () => {
    beforeAll(async () => {
      await db.episode.destroy({ truncate: true, cascade: true });
      await db.season.destroy({ truncate: true, cascade: true });
      await db.character.destroy({ truncate: true, cascade: true });
      await db.user.destroy({ truncate: true, cascade: true });

      const episodesTestData = [
        {
          id: 1,
          nEpisode: 1,
          title: "Pilot",
          directedBy: "Marcos Siega",
          writtenBy: "Teleplay by : Kevin Williamson & Julie Plec",
          airDate: "2009-09-10",
          productionCode: "296766",
          USviewers: 4.91,
          nSeason: 1,
          createdAt: "2021-01-20T15:48:56.651Z",
          updatedAt: "2021-01-20T15:48:56.651Z",
        },
        {
          id: 2,
          nEpisode: 2,
          title: "The Night of the Comet",
          directedBy: "Marcos Siega",
          writtenBy: "Kevin Williamson & Julie Plec",
          airDate: "2009-09-17",
          productionCode: "2J5001",
          USviewers: 3.78,
          nSeason: 2,
          createdAt: "2021-01-20T15:48:56.651Z",
          updatedAt: "2021-01-20T15:48:56.651Z",
        },
        {
          id: 3,
          nEpisode: 3,
          title: "Friday Night Bites",
          directedBy: "John Dahl",
          writtenBy: "Barbie Kligman & Bryan M. Holdman",
          airDate: "2009-09-24",
          productionCode: "2J5002",
          USviewers: 3.81,
          nSeason: 3,
          createdAt: "2021-01-20T15:48:56.651Z",
          updatedAt: "2021-01-20T15:48:56.651Z",
        },
        {
          id: 4,
          nEpisode: 4,
          title: "Family Ties",
          directedBy: "Guy Ferland",
          writtenBy: "Andrew Kreisberg & Brian Young",
          airDate: "2009-10-01",
          productionCode: "2J5003",
          USviewers: 3.53,
          nSeason: 4,
          createdAt: "2021-01-20T15:48:56.651Z",
          updatedAt: "2021-01-20T15:48:56.651Z",
        },
      ];

      const seasonsTestData = [
        {
          id: 1,
          createdAt: "2021-01-20T15:48:56.598Z",
          updatedAt: "2021-01-20T15:48:56.598Z",
        },
        {
          id: 2,
          createdAt: "2021-01-20T15:48:56.598Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 3,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 4,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 5,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 6,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 7,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
        {
          id: 8,
          createdAt: "2021-01-20T15:48:56.599Z",
          updatedAt: "2021-01-20T15:48:56.599Z",
        },
      ];

      const characterTestData = [
        {
          id: 1,
          character: "Elena Gilbert",
          actor: "Nina Dobrev",
          episodeCount: 134,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          character: "Katherine Pierce",
          actor: "Nina Dobrev",
          episodeCount: 109,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          character: "Stefan Salvatore",
          actor: "Paul Wesley",
          episodeCount: 171,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          character: "Silas",
          actor: "Paul Wesley",
          episodeCount: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const userTest = {
        email: "afaf.ibrahimi@gmail.com",
        key: "534d9e33-f4df-4e3c-af0c-f3ec8abccc36",
        count: 0,
      };
      await db.character.bulkCreate(characterTestData);
      await db.season.bulkCreate(seasonsTestData);
      await db.episode.bulkCreate(episodesTestData);
      await db.user.create(userTest);
    });
    test("should refuse request without apikey ", async (done) => {
      const response = await server.get("/api/episodes");

      expect(response.status).toBe(400);
      done();
    });
    test("should refuse request without a valid key ", async (done) => {
      const response = await server.get("/api/episodes?key=blabla");

      expect(response.status).toBe(403);
      done();
    });
    test("should accept request with a valid key ", async (done) => {
      const response = await server.get(
        "/api/episodes?key=534d9e33-f4df-4e3c-af0c-f3ec8abccc36"
      );

      expect(response.status).toBe(200);
      done();
    });
  });
});
