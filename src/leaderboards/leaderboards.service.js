const knex = require("../db/connection");

function list() {
    return knex("leaderboards").select("*")
}

module.exports = {
    list,
}