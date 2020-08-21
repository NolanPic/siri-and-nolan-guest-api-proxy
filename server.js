const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { getGuests, updateGuestStatus } = require("./contentfulApi");

const server = express();
server.use(helmet());
server.use(cors());

server.get("/api", (req, res) => {
  res.send("<h1>👋</h1>");
});

server.get("/api/guests", async (req, res) => {
  try {
    const guests = await getGuests();
    res.status(200).send(guests);
  } catch (err) {
    console.warn("error", err);
    res.status(500).send({ error: err });
  }
});

module.exports = server;
