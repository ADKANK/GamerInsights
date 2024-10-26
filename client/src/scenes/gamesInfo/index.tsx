import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Game, Review } from '../../interface/games';
import { useAuth0 } from '@auth0/auth0-react';
import ReviewPage from '../reviewPage';

const GameDetails = () => {
    const navigate = useNavigate();
    const { gameId } = useParams<{ gameId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [gameInfo, setGameInfo] = useState<Game | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);


    const fetchGameDetails = async () => {
        try {
            const response = await fetch(`https://gamer-insights-server.vercel.app/games/details?_id=${gameId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Fetched game details:', data);
            setGameInfo(data);
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    };

    useEffect(() => {
        fetchGameDetails();

    }, []);

    if (!gameInfo) {
        return <div>Loading...</div>;
    }

    return (

        <div className='flex flex-col'>
            <nav className="bg-gray-800 text-white p-4 flex ">
                <div className='flex flex-row justify-start'>
                    <button onClick={() => navigate(-1)} className='mr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                </div>
                <div className="justify-center">

                    <span className="text-2xl font-semibold">{gameInfo?.name || 'Loading...'}</span>
                </div>
            </nav>

            <div className="container mx-auto mt-4">
                {gameInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
                                <tbody>
                                    {gameInfo.sid && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">SID</td>
                                            <td className="py-2 px-4">{gameInfo.sid}</td>
                                        </tr>
                                    )}
                                    {gameInfo.name && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Name</td>
                                            <td className="py-2 px-4">{gameInfo.name}</td>
                                        </tr>
                                    )}
                                    {gameInfo.published_store && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Published Store</td>
                                            <td className="py-2 px-4">{(gameInfo.published_store instanceof Date) ? gameInfo.published_store.toLocaleDateString() : gameInfo.published_store}</td>
                                        </tr>
                                    )}
                                    {gameInfo.platforms && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Platforms</td>
                                            <td className="py-2 px-4">{gameInfo.platforms}</td>
                                        </tr>
                                    )}
                                    {gameInfo.developers && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Developers</td>
                                            <td className="py-2 px-4">{gameInfo.developers}</td>
                                        </tr>
                                    )}
                                    {gameInfo.publishers && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Publishers</td>
                                            <td className="py-2 px-4">{gameInfo.publishers}</td>
                                        </tr>
                                    )}

                                    {gameInfo.genres && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Genre</td>
                                            <td className="py-2 px-4">{gameInfo.genres}</td>
                                        </tr>
                                    )}
                                    {gameInfo.tags && (
                                        <tr>
                                            <td className="py-2 px-4 font-semibold">Tags</td>
                                            <td className="py-2 px-4">{gameInfo.tags}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                        <div className="flex flex-row">
                            <img src={gameInfo.image} alt={gameInfo.name} className="mt-4 w-100 h-auto" />
                        </div>
                        <div className="col-span-2 ml-4">

                            <ReviewPage />

                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )


};

export default GameDetails;
