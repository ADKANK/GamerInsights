export interface Game {
    _id: string;
    sid: number;
    store_url: string;
    store_promo_url: string;
    store_uscore: number;
    published_store: Date;
    published_meta: Date;
    published_stsp: Date;
    published_hltb: Date;
    published_igdb: Date;
    image: string;
    name: string;
    description: string;
    full_price: number;
    current_price: number;
    discount: number;
    platforms: string;
    developers: string;
    publishers: string;
    languages: string;
    voiceovers: string;
    categories: string;
    genres: string;
    tags: string;
    achievements: number;
    gfq_url: string;
    gfq_difficulty: string;
    gfq_difficulty_comment: string;
    gfq_rating: number;
    gfq_rating_comment: string;
    gfq_length: number;
    gfq_length_comment: string;
    stsp_owners: number;
    stsp_mdntime: number;
    hltb_url: string;
    hltb_single: number;
    hltb_complete: number;
    meta_url: string;
    meta_score: number;
    meta_uscore: number;
    grnk_score: number;
    igdb_url: string;
    igdb_single: number;
    igdb_complete: number;
    igdb_score: number;
    igdb_uscore: number;
    igdb_popularity: number;
}

export interface Review {
    _id?: string;
    userId: string;
    review: string;
    createdAt: Date;
    userName: string;
}

