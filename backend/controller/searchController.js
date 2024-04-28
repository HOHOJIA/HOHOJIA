const searchHandler = require("../Application/Features/User/Commands/Search/searchHandler");

module.exports = {
  search: async (req, res) => {
    try {
      const { title, tag } = req.query;
      if (title) {
        const response = await searchHandler.handle(res, "title", title);
        res.status(200).json(response);
      } else if (tag) {
        const response = await searchHandler.handle(res, "tag", tag);
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
