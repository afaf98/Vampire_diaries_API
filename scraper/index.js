const fs = require("fs");
const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;
const { getHTMLCharacters } = require("./characters");
const extractDate = require("extract-date");

async function getHTML() {
  const response = await axios(
    "https://en.wikipedia.org/wiki/List_of_The_Vampire_Diaries_episodes"
  );
  getTablesSeasons(response);
}

function getTablesSeasons(response) {
  const dom = new JSDOM(response.data);
  const tableSeasonElements = dom.window.document.querySelectorAll(
    ".wikiepisodetable  "
  );
  getSeasons(tableSeasonElements);
}

function getSeasons(tableSeasonElements) {
  let seasons = Array.from(tableSeasonElements).map(parseTable);
  // console.log(seasons);
  // JSON.stringify(seasons);
  const episodes = seasons.map((season) => {
    return season.episodes.map((episode) => {
      if (episode["No."]) {
        return;
      } else {
        return {
          nEpisode: parseInt(episode["No.overall"]),
          title: episode["Title"],
          directedBy: episode["Directed by"],
          writtenBy: episode["Written by"],
          airDate: extractDate.default(episode["Original air date"])[0].date,
          productionCode: episode["Prod.code"],
          USviewers: parseFloat(
            episode["U.S. viewers(millions)"].substring(
              0,
              episode["U.S. viewers(millions)"].indexOf("[")
            )
          ),
          nSeason: parseInt(episode["No. inseason"]),
        };
      }
    });
  });
  console.log("Seasons", episodes);
  fs.writeFileSync("seasons.json", JSON.stringify(episodes));
}

function parseTable(season, index) {
  const rowCount = season.querySelectorAll("tr").length;
  let headers = [];
  let episodes = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    let row = {};
    var oCells = season.rows.item(rowIndex).cells;
    var cellLength = oCells.length;
    for (var cellIndex = 0; cellIndex < cellLength; cellIndex++) {
      // get your cell info here
      var cellVal = oCells.item(cellIndex).textContent;
      if (rowIndex === 0) {
        headers.push(cellVal);
      } else {
        row = { ...row, [headers[cellIndex]]: cellVal };
      }
    }
    if (rowIndex != 0) {
      episodes.push(row);
    }
  }

  return { season: index + 1, episodes: episodes };
}

getHTMLCharacters();
getHTML();
