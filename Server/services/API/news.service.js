const { classifyCategory } = require("../classifyCategory.service");
const axios = require("axios");

module.exports.getNews = async (category, limit) => {
  let classifiedCategory = category ? await classifyCategory(category) : null;
  let url = `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=${limit || 10}`;
  if (classifiedCategory) {
    url += `&categories=${classifiedCategory}`;
  }
  const response = await axios.get(url);
  return response.data;
};
