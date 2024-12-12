import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import loadingGif from "./assets/loader.gif";
import chevron from "./assets/chevron.png";

const PokemonCard = ({ pokemonList }) => {
    const { id } = useParams(); // Récupération de l'ID du Pokémon à partir des paramètres d'URL
    const [activeType, setActiveType] = useState("Normal"); // État pour le type d'image affichée
    const [isStatsOpen, setIsStatsOpen] = useState(false); // État pour l'affichage des statistiques
    const [isResistancesOpen, setResistancesOpen] = useState(false); // État pour l'affichage des résistances

    // Recherche du Pokémon actuel dans la liste par son identifiant
    const currentPokemon = pokemonList.find(
        (pokemon) => pokemon.pokedex_id.toString() === id
    );

    // Affiche un gif de chargement si le Pokémon n'est pas trouvé
    if (!currentPokemon) {
        return (
            <div className="loading-gif">
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }

    // Destructuration des propriétés du Pokémon actuel
    const {
        pokedex_id,
        name: { fr: name } = {},
        evolution = {},
        stats = {},
        resistances = [],
        types: energiesTypes = [],
        sprites: { regular, shiny, gmax } = {},
        category: categorie = "Inconnu",
        height: taille = "N/A",
        weight: poids = "N/A",
        talents = [],
    } = currentPokemon;

    // Fonction pour rendre l'image du Pokémon en fonction du type actif
    const renderImage = () => {
        if (activeType === "Normal")
            return <img src={regular} alt="Image Pokémon" />;
        if (activeType === "Shiny") {
            return shiny ? (
                <img src={shiny} alt="Image Pokémon Shiny" />
            ) : (
                <p>Pas de version Shiny</p>
            );
        }
        if (activeType === "Gmax") {
            return gmax?.regular ? (
                <img src={gmax.regular} alt="Image Pokémon Gmax" />
            ) : (
                <p>Pas de version Gmax</p>
            );
        }
        return null;
    };

    // Fonction pour déterminer le niveau d'évolution
    const getEvolutionLevel = (evolutionData) => {
        if (!evolutionData?.length) return "Base";
        return evolutionData.length < 2 ? "Niveau 1" : "Niveau 2";
    };

    // Fonction pour rendre les évolutions du Pokémon
    const renderEvolutions = () => {
        const evolutionLevel = getEvolutionLevel(evolution?.pre);
        if (evolutionLevel === "Base") {
            return (
                <>
                    {evolution?.next?.map((nextEvo, index) => {
                        const nextPokemon = pokemonList.find(
                            (pokemon) =>
                                pokemon.pokedex_id === nextEvo.pokedex_id
                        );
                        return (
                            <Link
                                to={`/card/${nextPokemon.pokedex_id}`}
                                key={index}
                            >
                                <div className="evolution-item">
                                    {nextPokemon && (
                                        <img
                                            src={nextPokemon.sprites.regular}
                                            alt={`Évolution suivante : ${nextEvo.name}`}
                                        />
                                    )}
                                    <p>{nextEvo.name}</p>
                                    {getEvolutionLevel(
                                        nextPokemon.evolution.pre
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </>
            );
        }
        if (evolutionLevel === "Niveau 1" || evolutionLevel === "Niveau 2") {
            return (
                <>
                    {evolution?.pre?.map((preEvo, index) => {
                        const prevPokemon = pokemonList.find(
                            (pokemon) =>
                                pokemon.pokedex_id === preEvo.pokedex_id
                        );
                        return (
                            <Link
                                to={`/card/${prevPokemon.pokedex_id}`}
                                key={index}
                            >
                                <div className="evolution-item">
                                    {prevPokemon && (
                                        <img
                                            src={prevPokemon.sprites.regular}
                                            alt={`Évolution précédente : ${preEvo.name}`}
                                        />
                                    )}
                                    <p>{preEvo.name}</p>
                                    <p>
                                        {getEvolutionLevel(
                                            prevPokemon?.evolution?.pre
                                        )}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                    {evolution?.next?.map((nextEvo, index) => {
                        const nextPokemon = pokemonList.find(
                            (pokemon) =>
                                pokemon.pokedex_id === nextEvo.pokedex_id
                        );
                        return (
                            <Link
                                to={`/card/${nextPokemon.pokedex_id}`}
                                key={index}
                            >
                                <div className="evolution-item">
                                    {nextPokemon && (
                                        <img
                                            src={nextPokemon.sprites.regular}
                                            alt={`Évolution suivante : ${nextEvo.name}`}
                                        />
                                    )}
                                    <p>{nextEvo.name}</p>
                                    <p>
                                        {getEvolutionLevel(
                                            nextPokemon?.evolution?.pre
                                        )}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </>
            );
        }
        return null;
    };

    return (
        <main>
            <div className="pokemon_card-container">
                {/* Titre et informations principales */}
                <div className="card-container_title">
                    <p className="evolution-level">
                        {getEvolutionLevel(evolution?.pre)}
                    </p>
                    <p>{name || "Nom inconnu"}</p>
                    <div className="pvTypes">
                        <span className="pv-label">pv&nbsp;</span>
                        {stats?.hp || "N/A"}
                        {energiesTypes?.map((type, index) => (
                            <img
                                src={type.image}
                                alt={`Type ${type.name}`}
                                key={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Images du Pokémon */}
                <div className="img_pokemon-container">
                    <div className="img_type-container">
                        {["Normal", "Shiny", "Gmax"].map((type) => (
                            <span
                                key={type}
                                className={`img_type ${
                                    activeType === type ? "active" : ""
                                }`}
                                onClick={() => setActiveType(type)}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <figure className="img_pokemon">
                        {renderImage()}
                        <figcaption>
                            n°{pokedex_id} - {categorie} - Taille : {taille} -
                            Poids : {poids}
                        </figcaption>
                    </figure>
                </div>

                {/* Talents du Pokémon */}
                {Array.isArray(talents) && talents.length > 0 && (
                    <div className="talents-container">
                        <h4>Talents :</h4>
                        {talents.map((talent, index) => (
                            <p key={index}>{talent.name} |</p>
                        ))}
                    </div>
                )}

                {/* Statistiques */}
                <div className="bloc_stats-container">
                    {/* Titre des statistiques avec toggle pour afficher/masquer */}
                    <div
                        className="stats_title-container"
                        onClick={() => setIsStatsOpen(!isStatsOpen)}
                    >
                        <h4>Statistiques :</h4>
                        <span
                            className={`chevron ${
                                isStatsOpen ? "rotated" : ""
                            }`}
                        >
                            <img
                                src={chevron}
                                alt="chevron"
                                style={{ width: "15px" }}
                            />
                        </span>
                    </div>

                    {/* Affichage conditionnel des statistiques */}
                    <div
                        className={`stats-container ${
                            isStatsOpen ? "open" : ""
                        }`}
                    >
                        {/* Bloc des statistiques principales */}
                        <div className="bloc">
                            <span>PV : {stats?.hp || "/"}</span>
                            <span>Attaque : {stats?.atk || "/"}</span>
                            <span>Défense : {stats?.def || "/"}</span>
                        </div>

                        {/* Bloc des statistiques spéciales */}
                        <div className="bloc">
                            <span>
                                Attaque spéciale : {stats?.spe_atk || "/"}
                            </span>
                            <span>
                                Défense spéciale : {stats?.spe_def || "/"}
                            </span>
                            <span>Vitesse : {stats?.vit || "/"}</span>
                        </div>
                    </div>
                </div>

                {/* Resistances */}
                {/* Titre des résistances avec toggle pour afficher/masquer */}
                <div className="bloc_resistances-container">
                    {/* Titre des résistances avec toggle pour afficher/masquer */}
                    <div
                        className="resistances_title-container"
                        onClick={() => setResistancesOpen(!isResistancesOpen)}
                    >
                        <h4>Résistances :</h4>
                        <span
                            className={`chevron ${
                                isResistancesOpen ? "rotated" : ""
                            }`}
                        >
                            <img
                                src={chevron}
                                alt="chevron"
                                style={{ width: "15px" }}
                            />
                        </span>
                    </div>

                    {/* Affichage conditionnel des résistances */}
                    <div
                        className={`resistances-container ${
                            isResistancesOpen ? "open" : ""
                        }`}
                    >
                        <div className="bloc">
                            {resistances?.map((resistance, index) => (
                                <p
                                    key={index}
                                    style={
                                        resistance.multiplier < 1
                                            ? { color: "green" }
                                            : resistance.multiplier == 1
                                            ? { color: "initial" }
                                            : { color: "red" }
                                    }
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/${encodeURIComponent(
                                            resistance.name.toLowerCase()
                                        )}.png`}
                                        alt="Type"
                                    />
                                    {resistance.name} :{" "}
                                    <span>x{resistance.multiplier}</span> |
                                </p>
                            )) || "Données inconnues"}
                        </div>
                    </div>
                </div>

                {/* Evolutions du Pokémon */}
                <div className="evolutions-container">
                    <div className="evolutions_content">
                        <h4>Evolutions :</h4>
                        {renderEvolutions()}
                    </div>
                </div>
            </div>
        </main>
    );
};
export default PokemonCard;
