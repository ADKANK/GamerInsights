import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    userId: String,
    gameId: String,
    review: String,
    userName: String,
    createdAt: { type: Date, default: Date.now() },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewsSchema);

export default Review;