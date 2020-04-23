const express = require("express");
const apiVersion1 = require("./whois_v1");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("App is responsive");
});
app.use("/v1", apiVersion1);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
