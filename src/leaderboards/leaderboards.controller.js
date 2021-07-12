const service = require("./leaderboards.service");

async function list(req,res,next) {
    const data = await service.list();
    res.json({data});
}

module.exports = {
    list,
};