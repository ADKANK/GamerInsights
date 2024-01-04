import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, setFilteredGames } from '../../states/index'


const HomePage = () => {
    const dispatch = useDispatch();
    const { logout, user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [query, setQuery] = useState('');
    const gamesData = useSelector((state) => state.gamesData);
    const filteredGames = useSelector((state) => state.filteredGames);
    const loading = useSelector((state) => state.loading);
    const isDesktop = useMediaQuery({ query: '(min-width: 960px)' });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const handleGameClick = (game) => {
        setSelectedGame(game);
    };

    const handleCloseDetails = () => {
        setSelectedGame(null);
    };

    const fetchGames = async (req, res) => {
        try {
            dispatch(fetchGamesStart());
            await fetch('http://localhost:3001/games').then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);

                }
                return response.json();
            }).then(data => {
                console.log('Fetched games data:', data);
                dispatch(fetchGamesSuccess(data));
            });
        } catch (error) {
            console.log({ message: error.message });
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3001/games/search?name=${query}`);
            const data = await response.json();
            dispatch(setFilteredGames(data));
        } catch (error) {
            dispatch(fetchGamesFailure(error));
        }
    };
    const resetSearch = (e) => {
        dispatch(setFilteredGames(gamesData));
        setQuery('');
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        fetchGames();
    }, [dispatch]);


    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <span className="text-2xl font-semibold text-white">GameReviews</span>
                    {isDesktop ? (
                        <>
                            <input
                                type="text"
                                value={query}
                                className="flex-grow border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md px-4 py-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Search"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md ml-2 hover:bg-blue-600"
                            >
                                Search
                            </button>
                            <button
                                onClick={resetSearch}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md ml-2 hover:bg-blue-600"
                            >
                                Reset
                            </button>


                            <div className="flex items-center space-x-6 rtl:space-x-reverse ml-5">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center space-x-4 ml-auto justify-end ml-5">

                                            <img src={user.picture} className="w-10 h-10 rounded-full" alt="Rounded avatar" />
                                            <div className="text-white">
                                                <span className="font-semibold">{user.name}</span>
                                            </div>
                                            <div className="relative inline-block text-left">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    onClick={toggleDropdown}
                                                >

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </button>

                                                {isOpen && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <div className="py-1" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
                                                            <button
                                                                onClick={() => navigate(`/profile/${user.sub}`)} // Add your profile button logic
                                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem"
                                                            >
                                                                Profile
                                                            </button>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem"
                                                            >
                                                                Logout
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={loginWithRedirect} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button> </>
                                )
                                }
                            </div>
                        </>) : (
                        isAuthenticated ? (
                            <>
                                <div className="flex items-center space-x-4 ml-auto justify-end ml-5">

                                    <img src={user.picture} className="w-10 h-10 rounded-full" alt="Rounded avatar" />

                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={loginWithRedirect} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button> </>
                        ))


                    }
                </div>
            </nav >

            {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>
            }
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


        </>
    );
};


export default HomePage;