import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import loadingGif from "./assets/loader.gif";

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemonList, setPokemonList] = useState([]); // Initialisé avec un tableau vide

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://tyradex.app/api/v1/pokemon"
                ); // Utilisation correcte de fetch
                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération des données"
                    );
                }
                const result = await response.json();
                setPokemonList(result);
            } catch (error) {
                setError(error.message); // Gère l'erreur
            } finally {
                setLoading(false); // Désactive le chargement
            }
        };

        fetchData();
    }, []); // Un tableau de dépendances vide signifie que cet effet s'exécute une fois après le rendu initial

    if (loading)
        return (
            <div className="loading-gif">
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main>
            <div className="cards-container">
                {pokemonList.map((pokemon) => (
                    <Card
                        key={pokemon.pokedex_id}
                        id={pokemon.pokedex_id || "?"}
                        name={pokemon.name?.fr || "Nom inconnu"}
                        img={
                            pokemon.sprites?.regular || "default-image-url.jpg"
                        }
                        types={pokemon.types}
                        hp={pokemon.stats?.hp || "?"}
                        pre={pokemon.evolution?.pre}
                        next={pokemon.evolution?.next}
                        generation={pokemon.generation}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;
