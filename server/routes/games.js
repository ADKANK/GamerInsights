import express from 'express';
import { getGamesInfo } from '../controllers/games.js';
import { getCollection, connectToDatabase } from '../index.js';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

const router = express.Router();

router.get('/', getGamesInfo);
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        const collection = getCollection(process.env.COLLECTION_NAME);
        const gamesInfo = await collection.find({ name: { $regex: name, $options: 'i' } }).toArray();
        res.status(200).json(gamesInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/details/', async (req, res) => {
    try {
        const { _id } = req.query;

        // Convert _id to ObjectId
        const objectId = new ObjectId(_id);
        const collection = getCollection(process.env.COLLECTION_NAME);
        const gameInfo = await collection.findOne({ _id: objectId });

        res.status(200).json(gameInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
export default router;