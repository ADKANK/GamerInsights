import dotenv from 'dotenv';
import express from 'express';
import { gameSearch, getGamesInfo, getGameDetails, postReview, getReviews } from '../controllers/games.js';

dotenv.config();

const router = express.Router();

router.get('/', getGamesInfo);
router.get('/search', gameSearch);
router.get('/details/', getGameDetails);
router.post('/:id/reviews/', postReview);
router.get('/reviews/:id/', getReviews);


export default router;