import NewsFeed from "../models/newsFeeds.js";

const searchAndFilter = async (req, res) => {
    try {
        const { searchTerm, selectedSources = [] } = req.body;
        console.log("🚀 ~ file: search.js:6 ~ searchAndFilter ~ selectedSources:", selectedSources)

        const newsData = await NewsFeed.find();
        // console.log("🚀 ~ file: search.js:8 ~ searchAndFilter ~ newsData:", newsData)
    
        const filteredNews = newsData.filter(news => {
            const matchesSearchTerm = news.title.toLowerCase().includes(searchTerm);
            // console.log("🚀 ~ file: search.js:13 ~ filteredNews ~ matchesSearchTerm:", matchesSearchTerm)
            const matchesSelectedSource = selectedSources.length === 0 || selectedSources.includes(news.source.name);
            return matchesSearchTerm && matchesSelectedSource;
        });
  
        res.json(filteredNews);
    } catch (error) {
        console.log("error Loggs:", error);
        res.send(error);
    }
};

const getSource = async (req, res) => {
    try {
        const newsData = await NewsFeed.find();
        // console.log("🚀 ~ file: search.js:8 ~ searchAndFilter ~ newsData:", newsData)
    
        const sourceData = newsData.map((item) => item.source.name)
        const uniqueSourceList = Array.from(new Set(sourceData));
        // console.log("🚀 ~ file: search.js:32 ~ getSource ~ sourceData:", uniqueSourceList)
  
        res.json(uniqueSourceList);
    } catch (error) {
        console.log("error Loggs:", error);
        res.send(error);
    }
}

export {
    searchAndFilter,
    getSource
}
