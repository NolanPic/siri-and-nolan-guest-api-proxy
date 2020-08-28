const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const {
  getGuests,
  updateGuestStatus,
  getPhotos,
  formatGuestEntry,
} = require("./contentfulApi");
const sendEmailNotification = require("./emailNotification");

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

server.put("/api/guests/attending/:guestid", async (req, res) => {
  const { guestid } = req.params;
  try {
    const guest = formatGuestEntry(await updateGuestStatus(guestid, true));

    // send email notification
    sendEmailNotification(guest);
    res.status(204).send();
  } catch (err) {
    console.warn("error", err);
    res.status(500).send({ error: err });
  }
});

server.get("/api/photos", async (req, res) => {
  try {
    const photos = await getPhotos();
    res.status(200).send(photos);
  } catch (err) {
    console.warn("error", err);
    res.status(500).send({ error: err });
  }
});

module.exports = server;
