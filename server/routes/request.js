const express = require("express");
const requestRoutes = express.Router();
const bodyParser = require("body-parser");
const { deleteRequest } = require("../controllers/delete");
const { getRequest } = require("../controllers/get");

requestRoutes.use(bodyParser.urlencoded({ extended: false }));
requestRoutes.use(bodyParser.json());

requestRoutes.post("/delete",deleteRequest)
requestRoutes.post("/get",getRequest);
// requestRoutes.post("/post",registerUser);
// requestRoutes.post("/put",registerUser);

module.exports = { requestRoutes };