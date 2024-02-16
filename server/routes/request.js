const express = require("express");
const requestRoutes = express.Router();
const bodyParser = require("body-parser");
const { deleteRequest } = require("../controllers/delete");
const { getRequest } = require("../controllers/get");
const { postRequest } = require("../controllers/post");
const { putRequest } = require("../controllers/put");

requestRoutes.use(bodyParser.urlencoded({ extended: false }));
requestRoutes.use(bodyParser.json());

requestRoutes.post("/delete",deleteRequest)
requestRoutes.post("/get",getRequest);
requestRoutes.post("/post",postRequest);
requestRoutes.post("/put",putRequest);

module.exports = { requestRoutes };