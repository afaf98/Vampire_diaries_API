const request = require("supertest");
const app = require("../app");
const db = require("../models");

const server = request(app);

describe.skip("GET /episodes", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("query for episode", () => {
    beforeAll(async () => {
      await db.episode.destroy({ truncate: true, cascade: true });

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

      await db.episode.bulkCreate(episodesTestData);
    });

    test("should GET all episodes", async (done) => {
      const response = await server.get("/episodes");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(4);
      expect(response.body[0].title).toBe("Pilot");
      done();
    });

    test("should GET episode by id", async (done) => {
      const response = await server.get("/episodes/4");

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(4);
      expect(response.body.title).toBe("Family Ties");

      done();
    });
    test("should GET one episode by directedBy authors", async (done) => {
      const response = await server.get("/episodes?directedBy=Guy Ferland");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toEqual("Family Ties");

      done();
    });

    test("should GET one episode in base of the title", async (done) => {
      const response = await server.get("/episodes?title=Pilot");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toEqual("Pilot");

      done();
    });

    test("should GET one episode in base of productionCode ", async (done) => {
      const response = await server.get("/episodes?productionCode=2J5002");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toEqual("Friday Night Bites");

      done();
    });
  });

  describe("query seasons", () => {
    beforeAll(async () => {
      await db.season.destroy({ truncate: true, cascade: true });

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
      await db.season.bulkCreate(seasonsTestData);
    });

    test("should GET all seasons", async (done) => {
      const response = await server.get("/seasons");

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(8);
      expect(response.body.seasons[0].id).toBe(1);
      done();
    });
  });

  describe("queries for seasons and episodes", () => {
    beforeAll(async () => {
      await db.episode.destroy({ truncate: true, cascade: true });
      await db.season.destroy({ truncate: true, cascade: true });

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
          seasonId: 1,
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
          seasonId: 1,
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
          seasonId: 3,
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
          seasonId: 1,
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
      await db.season.bulkCreate(seasonsTestData);
      await db.episode.bulkCreate(episodesTestData);
    });
    test("should GET all episode from one season ", async (done) => {
      const response = await server.get("/seasons/1/episodes");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0].title).toBe("Pilot");
      done();
    });
  });

  describe("queries characters", () => {
    beforeAll(async () => {
      await db.character.destroy({ truncate: true, cascade: true });

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
      await db.character.bulkCreate(characterTestData);
    });

    test("should GET all Characters ", async (done) => {
      const response = await server.get("/characters");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(4);
      expect(response.body[0].character).toBe("Elena Gilbert");
      done();
    });

    test("should GET all actors ", async (done) => {
      const response = await server.get("/actors");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(4);
      expect(response.body[0].actor).toBe("Nina Dobrev");
      done();
    });
  });
});
