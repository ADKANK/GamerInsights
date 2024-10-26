import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config(); 
// MongoDB Client
const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

const getCollection = (collectionName) => {
    return client.db(process.env.DB_NAME).collection(collectionName);
};

export { getCollection, connectToDatabase };
