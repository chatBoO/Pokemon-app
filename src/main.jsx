import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import PokemonCard from "./PokemonCard.jsx";

function Main() {
    const [userSearch, setUserSearch] = useState(""); // État pour la recherche utilisateur
    const [loading, setLoading] = useState(true); // État pour indiquer le chargement des données
    const [error, setError] = useState(null); // État pour stocker les erreurs éventuelles
    const [pokemonList, setPokemonList] = useState([]); // État pour la liste des Pokémon

    useEffect(() => {
        // Fonction asynchrone pour récupérer les données des Pokémon
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
                setPokemonList(result); // Mise à jour de la liste des Pokémon avec les données récupérées
            } catch (error) {
                setError(error.message); // Mise à jour de l'état d'erreur en cas de problème
            } finally {
                setLoading(false); // Fin du chargement des données
            }
        };

        fetchData(); // Appel de la fonction pour récupérer les données au montage du composant
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header onSearch={setUserSearch} /> {/* Composant Header avec fonction de recherche */}
                <Routes>
                    <Route>
                        <Route
                            path="/"
                            element={
                                <App
                                    userSearch={userSearch} // Propagation de la recherche utilisateur
                                    loading={loading} // Propagation de l'état de chargement
                                    error={error} // Propagation de l'état d'erreur
                                    pokemonList={pokemonList} // Propagation de la liste des Pokémon
                                />
                            }
                        />
                        <Route
                            path="/card/:id"
                            element={<PokemonCard pokemonList={pokemonList} />} // Affichage d'une carte Pokémon spécifique
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

// Rendu du composant principal dans l'élément root du DOM
createRoot(document.getElementById("root")).render(<Main />);
