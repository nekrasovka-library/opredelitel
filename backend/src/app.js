const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const { join } = require("node:path");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("/images", express.static(join(__dirname, "../../images")));

module.exports = app;
