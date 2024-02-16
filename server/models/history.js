const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    request: { type: String, required: true },
    route: { type: String, required: true },
    body: { type: String },
    headers:{type:Object},
  },
  { timestaps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
