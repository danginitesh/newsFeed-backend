import axios from 'axios';
import cron from 'node-cron';
import NewsFeeds from '../models/newsFeeds.js';

const cronJobs = () => { 
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    cron.schedule('0 0 0 * * *', async () => {
        try {
            const response = await axios.get(
                `${process.env.NEWS_API_BASE_URL}?q=tesla&from=${formattedDate}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
            );

            const newsData = response.data.articles;
    
            // Insert news data into the MongoDB database
            await NewsFeeds.insertMany(newsData);
    
            console.log('News data inserted into MongoDB');
        } catch (error) {
            console.error('Error fetching and inserting news data:', error.message);
        }
    })
};

export default cronJobs;
