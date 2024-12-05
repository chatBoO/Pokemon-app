import "./App.css";
import { useState } from "react";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import loadingGif from "./assets/loader.gif";

function App({ userSearch, loading, error, pokemonList }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    if (loading)
        return (
            <div className="loading-gif">
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    if (error) return <p>Erreur : {error}</p>;

    // Liste des Pokémon filtrée en fonction de la requête de recherche
    const filteredPokemonList = userSearch
        ? pokemonList.filter((pokemon) =>
              pokemon.name.fr.toLowerCase().includes(userSearch)
          )
        : pokemonList;

    // Calcul des éléments actuels à afficher
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPokemonList.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <main>
            <div className="items-per-page">
                <label>
                    Éléments par page :{" "}
                    <select
                        value={itemsPerPage}
                        onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                        }
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
            </div>
            <div className="cards-container">
                {currentItems.map((pokemon) => (
                    <Card
                        key={pokemon.pokedex_id}
                        id={pokemon.pokedex_id || 0}
                        name={pokemon.name?.fr || "Nom inconnu"}
                        img={
                            pokemon.sprites?.regular || "default-image-url.jpg"
                        }
                        types={pokemon.types}
                        hp={pokemon.stats?.hp || "?"}
                        pre={pokemon.evolution?.pre}
                        generation={pokemon.generation}
                    />
                ))}
            </div>

            <Pagination
                totalItems={filteredPokemonList.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
        </main>
    );
}

export default App;
