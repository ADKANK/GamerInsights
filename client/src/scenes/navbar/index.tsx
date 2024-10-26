import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGamesFailure, setFilteredGames } from '../../states/index'
import { RootState } from '../..';
const NavBar = () => {
    const dispatch = useDispatch();
    const { logout, user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [query, setQuery] = useState<string>('');
    const isDesktop = useMediaQuery({ query: '(min-width: 960px)' });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const gamesData = useSelector((state: RootState) => state.gamesData);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const handleLogin = async () => {
        await loginWithRedirect();
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSearch = async () => {
        try {
            const response = await fetch(`https://gamer-insights-server.vercel.app/games/search?name=${query}`);
            const data = await response.json();
            dispatch(setFilteredGames(data));
        } catch (error) {
            if (error instanceof Error)
                dispatch(fetchGamesFailure(error.message));
        }
    };
    const resetSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setFilteredGames(gamesData));
        setQuery('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
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

                                        {user && <img src={user.picture} className="w-10 h-10 rounded-full" alt="Rounded avatar" />}
                                        <div className="text-white">
                                            <span className="font-semibold">{user && user.name}</span>
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
                                                            onClick={() => user && navigate(`/profile/${user.sub}`)} // Add your profile button logic
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
                                    <button onClick={handleLogin} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button> </>
                            )
                            }
                        </div>
                    </>) : (
                    isAuthenticated ? (
                        <>
                            <div className="flex items-center space-x-4 ml-auto justify-end ml-5">

                                {user && <img src={user.picture} className="w-10 h-10 rounded-full" alt="Rounded avatar" />}

                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogin} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button> </>
                    ))


                }
            </div>
        </nav >

    )
};

export default NavBar
