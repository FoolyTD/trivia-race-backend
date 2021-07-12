// import the data from fixtures file
const leaderboards = require("../fixtures/leaderboards");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE leaderboards RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("leaderboards").insert(leaderboards);
    });
};
