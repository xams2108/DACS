const Service = require("../../services/API/news.service");

module.exports.index = async (req, res) => {
    try {
        const category = req.params.category || undefined;
        const limit = parseInt(req.query.limit) || 10;

        const news = await Service.getNews(category, limit);

        res.status(200).json({
            success: true,
            data: news.Data, 
        });
    } catch (error) {
        console.error("Error fetching news:", error.message || error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
