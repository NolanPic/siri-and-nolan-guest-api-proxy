const contentful = require("contentful");
const contentfulCMS = require("contentful-management");

const makeContentfulClient = () => {
  return contentful.createClient({
    space: "kp3rjo141qje",
    accessToken: process.env.CONTENTFUL_TOKEN,
  });
};

const getPhotos = () => {
  const client = makeContentfulClient();

  return client
    .getEntries({
      order: "fields.order",
      content_type: "photos",
    })
    .then((response) => {
      return response.items.map((item) => formatPhotoEntry(item));
    });
};

const getGuests = () => {
  const client = makeContentfulClient();

  return client
    .getEntries({
      order: "fields.lastName,fields.firstName",
      content_type: "weddingGuest",
    })
    .then((response) => {
      return response.items.map((item) => formatGuestEntry(item));
    });
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
      entry.fields.attending = {
        "en-US": attending,
      };
      return entry.update();
    })
    .then((entry) => {
      return entry.publish();
    });
};

function formatGuestEntry(guestEntry) {
  // ensure that "attending" is not undefined, but an actual boolean
  const attending = guestEntry.fields.attending ? true : false;

  return {
    id: guestEntry.sys.id,
    firstName: guestEntry.fields.firstName,
    lastName: guestEntry.fields.lastName,
    attending,
  };
}

function formatPhotoEntry(photoEntry) {
  return {
    id: photoEntry.sys.id,
    file: photoEntry.fields.file.fields.file.url + "?h=1000", // set height to 1000px
    width: photoEntry.fields.width,
    height: photoEntry.fields.height,
    order: photoEntry.fields.order,
  };
}

module.exports = {
  getPhotos,
  getGuests,
  updateGuestStatus,
};
