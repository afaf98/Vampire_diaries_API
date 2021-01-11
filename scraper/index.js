const fs = require("fs");
const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;

async function getHTML() {
  const response = await axios(
    "https://en.wikipedia.org/wiki/List_of_The_Vampire_Diaries_episodes"
  );
  //   console.log(response.data);
  const dom = new JSDOM(response.data);
  const tableSeasonElements = dom.window.document.querySelectorAll(
    ".wikiepisodetable  "
  );
  let seasons = [];
  const listSeason = tableSeasonElements.forEach((season, index) => {
    // console.log(season.textContent);
    const rowCount = season.querySelectorAll("tr").length;
    let headers = [];
    let episodes = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      //gets cells of current row
      let row = {};
      var oCells = season.rows.item(rowIndex).cells;
      //gets amount of cells of current row
      var cellLength = oCells.length;
      //loops through each cell in current row
      for (var cellIndex = 0; cellIndex < cellLength; cellIndex++) {
        // get your cell info here
        var cellVal = oCells.item(cellIndex).textContent;
        if (rowIndex === 0) {
          //   console.log("cellvalue", cellVal);
          headers.push(cellVal);
        } else {
          row = { ...row, [headers[cellIndex]]: cellVal };
        }
        //   alert(cellVal);
      }
      //   i++;
      if (rowIndex != 0) {
        episodes.push(row);
      }
    }
    // console.log("Row", episodes);
    // console.log("HEADERS", headers);
    seasons.push({ season: index + 1, episodes: episodes });
  });
  console.log("seasons", seasons);
  //   console.log("check", tableSeasonElements);
  //gets rows of table
  //   var rowLength = Array.from(tableSeasonElements).rows.length;

  //loops through rows

  //   console.log(listSeason);
}

getHTML();
