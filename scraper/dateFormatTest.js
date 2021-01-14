const extractDate = require("extract-date");

const variables = "September 10, 2009 (2009-09-10)";

// console.log(extractDate());
console.log(extractDate.default(variables)[0].date);

// extractDate("extracts date from anywhere within the input 2000-01-02");
// // [{date: '2000-01-02'}]

// extractDate(
//   "extracts multiple dates located anywhere within the input: 2000-01-02, 2000-01-03"
// );
// // [{date: '2000-01-02'}, {date: '2000-01-03'}]

// extractDate("ignores ambiguous dates 02/01/2000");
// // []

// extractDate("uses `direction` to resolve ambiguous dates 02/01/2000", {
//   direction: "DMY",
// });
// // [{date: '2000-01-02'}]

// extractDate(
//   "uses `timezone` to resolve relative dates such as today or tomorrow",
//   { timezone: "Europe/London" }
// );
// // [{date: '2000-01-02'}, {date: '2000-01-03'}] (assuming that today is 2000-01-02)

// extractDate("extracts dates using locales May 1, 2017", { locale: "en" });
// [{date: '2015-05-01'}]
