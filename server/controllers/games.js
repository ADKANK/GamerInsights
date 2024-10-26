import dotenv from 'dotenv';
import { getCollection, connectToDatabase } from '../services/database.js';
import { ObjectId } from 'mongodb';

dotenv.config();

export const getGamesInfo = async (req, res) => {
    try {
        await connectToDatabase();
        const collection = getCollection(process.env.COLLECTION_NAME);
        console.log(collection)
        const gamesInfo = await collection.aggregate([{ $sample: { size: 50 } }]).toArray();
        res.status(200).json(gamesInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const gameSearch = async (req, res) => {
    try {
        const { name } = req.query;
        const collection = getCollection(process.env.COLLECTION_NAME);
        const gamesInfo = await collection.find({ name: { $regex: name, $options: 'i' } }).toArray();
        res.status(200).json(gamesInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGameDetails = async (req, res) => {
    try {
        const { _id } = req.query;
        const objectId = new ObjectId(_id);
        const collection = getCollection(process.env.COLLECTION_NAME);
        const gameInfo = await collection.findOne({ _id: objectId });

        res.status(200).json(gameInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postReview = async (req, res) => {
    try {
        const { review, userId, gameId, createdAt, userName } = req.body;
        const { id } = req.params;

        if (!userId || !review || !gameId || !createdAt || !userName) {
            return res.status(400).json({ message: 'userId, review, and gameId are required' });
        }

        const collection = getCollection('Review');

        const reviewObject = {
            userId,
            gameId: id,
            review,
            userName,
        };

        await collection.insertOne(reviewObject);

        console.log('Document Inserted');

        res.status(201).json({ message: 'Review posted successfully' });
    } catch (error) {
        console.error('Error posting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = getCollection('Review');
        const reviews = await collection.find({ gameId: id }).toArray();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
