import { getData } from "../../utils/apiRequest";

const getNews = async (category, limit) => {
  try {
    let url = "api/news";
    if (category) {
      url += `/${category}`;
    }
    if (limit) {
      url += `?limit=${limit}`;
    }
    console.log(url)
    const data = await getData(url);
    
    return data;
  } catch (error) {
    console.error("Lỗi khi get news:", error.message);
    throw error;
  }
};

export default getNews;
