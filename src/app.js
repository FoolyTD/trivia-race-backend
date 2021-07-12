const express = require("express");
const cors = require("cors");
const app = express();
const leaderboardsRouter = require("./leaderboards/leaderboards.router");

app.use(cors());
app.use(express.json());

app.use("/leaderboards", leaderboardsRouter);

//Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
})

// Error handler
app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message }); 
})

module.exports = app;