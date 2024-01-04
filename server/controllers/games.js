
import { getCollection, connectToDatabase } from "../index.js";
import dotenv from 'dotenv';

dotenv.config();

export const getGamesInfo = async (req, res) => {
    try {
        await connectToDatabase();
        const collection = getCollection(process.env.COLLECTION_NAME);
        const gamesInfo = await collection.aggregate([{ $sample: { size: 50 } }]).toArray();
        res.status(200).json(gamesInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}