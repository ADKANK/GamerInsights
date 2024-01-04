import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, setFilteredGames } from '../../states/index'
import NavBar from "../navbar";
import GameCard from "../widgets/GameCard";


const HomePage = () => {
    const dispatch = useDispatch();
    const filteredGames = useSelector((state) => state.filteredGames);
    const loading = useSelector((state) => state.loading);
    const navigate = useNavigate();

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
    useEffect(() => {
        fetchGames();
    }, [dispatch]);


    return (
        <>
            <NavBar />
            {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>}
            <GameCard filteredGames={filteredGames} />
        </>
    );
};


export default HomePage;