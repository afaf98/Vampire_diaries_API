const fs = require("fs");
const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;

async function getHTMLCharacters() {
  const response = await axios(
    "https://en.wikipedia.org/wiki/List_of_The_Vampire_Diaries_characters"
  );
  const dom = new JSDOM(response.data);
  const tableCharacters = dom.window.document.querySelector(
    ".wikitable > tbody "
  );
}

module.exports = { getHTMLCharacters };
