import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import PokemonCard from "./PokemonCard.jsx";

function Main() {
    const [userSearch, setUserSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://tyradex.app/api/v1/pokemon"
                );
                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération des données"
                    );
                }
                const result = await response.json();
                setPokemonList(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header onSearch={setUserSearch} />
                <Routes>
                    <Route>
                        <Route
                            path="/"
                            element={
                                <App
                                    userSearch={userSearch}
                                    loading={loading}
                                    error={error}
                                    pokemonList={pokemonList}
                                />
                            }
                        />
                        <Route
                            path="/card/:id"
                            element={<PokemonCard pokemonList={pokemonList} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

createRoot(document.getElementById("root")).render(<Main />);
