const searchHandler = require("../Application/Features/User/Commands/Search/searchHandler");
const errorMsg = require("../utils/errorMsg");
const tool = require("../utils/tool");

module.exports = {
  search: async (req, res) => {
    try {
      const { title, tag } = req.query;
      if (title) {
        const response = await searchHandler.handleForTitle(res, title);
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
