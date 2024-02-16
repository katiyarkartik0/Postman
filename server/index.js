const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { requestRoutes } = require("./routes/request");
const { historyRoutes } = require("./routes/history");

const routes = express.Router();

dotenv.config();
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use("/api/request", requestRoutes)
app.use("/api/history", historyRoutes)


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App has started")
    app.listen(process.env.PORT)
  }
  );
