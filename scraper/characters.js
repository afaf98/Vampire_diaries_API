const fs = require("fs");
const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;

async function getHTMLCharacters() {
  const response = await axios(
    "https://en.wikipedia.org/wiki/List_of_The_Vampire_Diaries_characters"
  );
  const tableCharacters = selectTable(response);
  getActors(tableCharacters);
}

function selectTable(response) {
  const dom = new JSDOM(response.data);
  const tableCharacters = dom.window.document.querySelector(
    ".wikitable > tbody "
  );
  return tableCharacters;
}

function getActors(tableCharacters) {
  const rowCount = Array.from(tableCharacters.rows);
  let actors = [];
  let previousActor = null;
  rowCount.forEach((character, rowIndex) => {
    if (rowIndex == 0 || rowIndex == 1) {
      return;
    }
    let row = {};
    const cellCount = Array.from(character.cells);
    const characters = cellCount[0].textContent.trim();
    const actor = cellCount[1];
    const episodeCount = parseInt(
      cellCount[cellCount.length - 1].textContent.trim()
    );

    if (previousActor) {
      console.log("Previous actor", previousActor);
      row = {
        character: characters,
        actor: previousActor,
        episodeCount: episodeCount,
      };
      previousActor = null;
    } else {
      const actorRowSpan = actor.rowSpan;

      let actorName = actor.textContent.trim();
      if (actorName.includes("[")) {
        actorName = actorName.substring(0, actorName.length - 3);
      }
      //   console.log("3 rows", characters, actorName, actorRowSpan);
      row = {
        character: characters,
        actor: actorName,
        episodeCount: episodeCount,
      };
      if (actorRowSpan == 2) {
        previousActor = actorName;
      }
    }
    actors.push(row);
  });
  console.log("Actors", actors);
  fs.writeFileSync("characters.json", JSON.stringify(actors));
}

module.exports = { getHTMLCharacters };
