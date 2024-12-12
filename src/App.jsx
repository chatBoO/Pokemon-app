import "./App.css";
import { useState } from "react";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import loadingGif from "./assets/loader.gif";

function App({ userSearch, loading, error, pokemonList }) {
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const [itemsPerPage, setItemsPerPage] = useState(20); // État pour le nombre d'éléments par page

    // Affiche un gif de chargement si les données sont en cours de récupération
    if (loading)
        return (
            <div className="loading-gif">
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );

    // Affiche un message d'erreur si une erreur survient
    if (error) return <p>Erreur : {error}</p>;

    // Filtrage de la liste des Pokémon en fonction de la recherche utilisateur
    const filteredPokemonList = userSearch
        ? pokemonList.filter((pokemon) =>
              pokemon.name.fr.toLowerCase().includes(userSearch)
          )
        : pokemonList;

    // Détermine les indices des éléments visibles pour la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Extrait les Pokémon à afficher sur la page actuelle
    const currentItems = filteredPokemonList.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <main>
            {/* Sélecteur pour modifier le nombre d'éléments affichés par page */}
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

            {/* Affichage des cartes Pokémon */}
            <div className="cards-container">
                {currentItems.map((pokemon) => (
                    <Card
                        key={pokemon.pokedex_id} // Identifiant unique pour chaque carte
                        id={pokemon.pokedex_id || 0} // Identifiant du Pokédex ou valeur par défaut
                        name={pokemon.name?.fr || "Nom inconnu"} // Nom du Pokémon ou valeur par défaut
                        img={
                            pokemon.sprites?.regular || "default-image-url.jpg"
                        } // Image du Pokémon ou image par défaut
                        types={pokemon.types} // Types du Pokémon
                        hp={pokemon.stats?.hp || "?"} // Points de vie ou valeur par défaut
                        pre={pokemon.evolution?.pre} // Évolution précédente (si disponible)
                        generation={pokemon.generation} // Génération du Pokémon
                    />
                ))}
            </div>

            {/* Composant de pagination */}
            <Pagination
                totalItems={filteredPokemonList.length} // Nombre total d'éléments après filtrage
                itemsPerPage={itemsPerPage} // Nombre d'éléments affichés par page
                currentPage={currentPage} // Page actuellement affichée
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // Mise à jour de la page courante
            />
        </main>
    );
}

export default App;
