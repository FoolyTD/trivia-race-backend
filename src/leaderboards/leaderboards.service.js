const knex = require("../db/connection");

function list() {
    return knex("leaderboards").select("*")
}
function create(entry) {
    return knex("leaderboards")
    .insert(entry);
}

module.exports = {
    list,
    create,
}