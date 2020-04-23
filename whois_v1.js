const express = require("express");
const api = express.Router();
const govtechiesRouter = require("./routes/govtechies.route");

api.use("/govtechies", govtechiesRouter);


module.exports = api;
