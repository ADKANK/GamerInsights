import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Game from '../../interface/games';

const GameDetails = () => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState<Game | null>(null);
    const fetchGameDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/games/details?_id=${gameId}`);
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
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-center">
                    <span className="text-2xl font-semibold">{gameInfo?.name || 'Loading...'}</span>
                </div>
            </nav>

            <div className="flex  ">
                {gameInfo ? (
                    <div className="flex space-y-4">
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
                                        <td className="py-2 px-4">{(gameInfo.published_store instanceof Date) ?? gameInfo.published_store.toLocaleDateString()}</td>
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
                        <img src={gameInfo.image} alt={gameInfo.name} />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    );
};

export default GameDetails;
