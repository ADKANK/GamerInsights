import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, setFilteredGames, setGamesData } from '../../states/index'
import NavBar from "../navbar";
import GameCard from "../widgets/GameCard";
import { RootState } from "../..";


const HomePage = () => {
    const dispatch = useDispatch();
    const filteredGames = useSelector((state: RootState) => state.filteredGames);
    const loading = useSelector((state: RootState) => state.loading);
    const navigate = useNavigate();
    const gamesData = useSelector((state: RootState) => state.gamesData);

    const fetchGames = async () => {
        try {
            dispatch(fetchGamesStart());
            await fetch('https://gamer-insights-server.vercel.app/games').then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);

                }
                return response.json();
            }).then(data => {
                console.log('Fetched games data:', data);
                dispatch(fetchGamesSuccess(data));
                dispatch(setGamesData(data));
            });
        } catch (error) {
            const err = error as Error;
            console.log({ message: err.message });
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