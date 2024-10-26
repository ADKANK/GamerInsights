import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Game } from '../../interface/games';

const GameCard = ({ filteredGames }: { filteredGames: Game[] | null }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="bg-blue-500 text-white p-4 text-center mb-4 rounded-md">
                    Games List
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames === null ? (<div className="text-center">No matching games found</div>) : (
                        filteredGames.map((game) => (
                            <div key={game._id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105" onClick={() => navigate(`games/${game._id}`)}>
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full h-40 object-cover object-center"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2">{game.name}</h2>
                                    <p className="text-gray-700">
                                        {game.description
                                            ? (
                                                <span>
                                                    {game.description.slice(0, 25)}{' '}
                                                    {game.description.length > 25 && (
                                                        <span className="text-blue-500 cursor-pointer">Read More</span>
                                                    )}
                                                </span>
                                            )
                                            : <span className="text-red-500">Description not available</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>

    )
};

export default GameCard;
