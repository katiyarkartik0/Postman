const express = require("express");
const historyRoutes = express.Router();
const bodyParser = require("body-parser");
const { getHistory } = require("../controllers/history");

historyRoutes.use(bodyParser.urlencoded({ extended: false }));
historyRoutes.use(bodyParser.json());

historyRoutes.get("/get",getHistory)

module.exports = { historyRoutes };