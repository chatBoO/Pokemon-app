import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import loadingGif from "./assets/loader.gif";
import chevron from "./assets/chevron.png";

const PokemonCard = ({ pokemonList }) => {
    const { id } = useParams();
    const [activeType, setActiveType] = useState("Normal");
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isResistancesOpen, setResistancesOpen] = useState(false);

    const currentPokemon = pokemonList.find(
        (pokemon) => pokemon.pokedex_id.toString() === id
    );

    if (!currentPokemon) {
        return (
            <div className="loading-gif">
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }

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

    // Définition de renderImage
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

    const getEvolutionLevel = (evolutionData) => {
        if (!evolutionData?.length) return "Base";
        // else if (evolutionData?.length )
        return evolutionData.length < 2 ? "Niveau 1" : "Niveau 2";
    };

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
                            <Link to={`/card/${nextPokemon.pokedex_id}`}>
                                <div key={index} className="evolution-item">
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
                            <Link to={`/card/${prevPokemon.pokedex_id}`}>
                                <div key={index} className="evolution-item">
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
                            <Link to={`/card/${nextPokemon.pokedex_id}`}>
                                <div key={index} className="evolution-item">
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
                    <div
                        className="stats_title-container"
                        onClick={() => setIsStatsOpen(!isStatsOpen)} // Toggle ouverture
                    >
                        <h4>Statistiques :</h4>
                        <span
                            className={`chevron ${
                                isStatsOpen ? "rotated" : ""
                            }`} // Classe conditionnelle
                        >
                            <img
                                src={chevron}
                                alt="chevron"
                                style={{ width: "15px" }}
                            />
                        </span>
                    </div>
                    {/* Affichage conditionnel du bloc */}
                    <div
                        className={`stats-container ${
                            isStatsOpen ? "open" : ""
                        }`}
                    >
                        <div className="bloc">
                            <span> PV : {stats?.hp || "/"}</span>
                            <span> Attaque : {stats?.atk || "/"}</span>
                            <span> Défense : {stats?.def || "/"}</span>
                        </div>
                        <div className="bloc">
                            <span>
                                {" "}
                                Attaque spéciale : {stats?.spe_atk || "/"}{" "}
                            </span>
                            <span>
                                {" "}
                                Défense spéciale : {stats?.spe_def || "/"}{" "}
                            </span>
                            <span> Vitesse : {stats?.vit || "/"}</span>
                        </div>
                    </div>
                </div>

                {/* Resistances */}
                <div className="bloc_resistances-container">
                    <div
                        className="resistances_title-container"
                        onClick={() => setResistancesOpen(!isResistancesOpen)} // Toggle ouverture
                    >
                        <h4>Resistances :</h4>
                        <span
                            className={`chevron ${
                                isResistancesOpen ? "rotated" : ""
                            }`} // Classe conditionnelle
                        >
                            <img
                                src={chevron}
                                alt="chevron"
                                style={{ width: "15px" }}
                            />
                        </span>
                    </div>
                    {/* Affichage conditionnel du bloc */}
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
