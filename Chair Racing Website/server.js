const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 4000;
const fs = require("fs");
let jsonData;

fs.readFile("highscore.json", "utf8", (err, data) => {
  jsonData = data;
});

app.use(cors(), bodyParser.json());

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(jsonData);
});

app.post("/", (req, res) => {
  console.log(req.body);
  updateFile("highscore.json", req.body);
});

function updateFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), "utf8", () => {
    console.log("wrote to file");
  });
}
