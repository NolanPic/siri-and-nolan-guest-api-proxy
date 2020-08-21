const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
server.use(helmet());
server.use(cors());

server.get("/api", (req, res) => {
  res.send("<h1>👋</h1>");
});

module.exports = server;
