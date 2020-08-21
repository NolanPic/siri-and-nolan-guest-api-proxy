const contentful = require("contentful");
const contentfulCMS = require("contentful-management");

const getGuests = () => {
  const client = contentful.createClient({
    space: "kp3rjo141qje",
    accessToken: process.env.CONTENTFUL_TOKEN,
  });

  return client.getEntries();
};

const updateGuestStatus = (id, attending) => {
  const client = contentfulCMS.createClient({
    accessToken: process.env.CONTENTFUL_CMS_TOKEN,
  });

  return client
    .getSpace("kp3rjo141qje")
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(id))
    .then((entry) => {
      console.log(entry);
      entry.fields.attending = {
        "en-US": attending,
      };
      return entry.update();
    });
};

module.exports = {
  getGuests,
  updateGuestStatus,
};
