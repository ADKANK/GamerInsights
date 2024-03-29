import mongoose from 'mongoose';

const gamesSchema = new mongoose.Schema({
    sid: Number,
    store_url: String,
    store_promo_url: String,
    store_uscore: Number,
    published_store: Date,
    published_meta: Date,
    published_stsp: Date,
    published_hltb: Date,
    published_igdb: Date,
    image: String,
    name: String,
    description: String,
    full_price: Number,
    current_price: Number,
    discount: Number,
    platforms: String,
    developers: String,
    publishers: String,
    languages: String,
    voiceovers: String,
    categories: String,
    genres: String,
    tags: String,
    achievements: Number,
    gfq_url: String,
    gfq_difficulty: String,
    gfq_difficulty_comment: String,
    gfq_rating: Number,
    gfq_rating_comment: String,
    gfq_length: Number,
    gfq_length_comment: String,
    stsp_owners: Number,
    stsp_mdntime: Number,
    hltb_url: String,
    hltb_single: Number,
    hltb_complete: Number,
    meta_url: String,
    meta_score: Number,
    meta_uscore: Number,
    grnk_score: Number,
    igdb_url: String,
    igdb_single: Number,
    igdb_complete: Number,
    igdb_score: Number,
    igdb_uscore: Number,
    igdb_popularity: Number
});

const Games = mongoose.model('Games', gamesSchema);

export default Games;
