const fs = require("fs");
const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;

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
  let seasons = [];
  tableSeasonElements.forEach((season, index) => {
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

    seasons.push({ season: index + 1, episodes: episodes });
    console.log(seasons);
    fs.writeFileSync("seasons.json", JSON.stringify(seasons));
  });
}

getHTML();
