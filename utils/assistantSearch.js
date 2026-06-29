const searchController = require("../controllers/search-controller");

const searchSittersForAssistant = async (criteria) => {
  let statusCode = 200;
  let payload = {};

  const req = { body: criteria };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      payload = data;
      return data;
    }
  };

  await searchController.searchSitters(req, res);

  if (statusCode >= 400) {
    return { origin: null, sitters: [], error: payload.message };
  }

  return payload;
};

module.exports = { searchSittersForAssistant };
