import React, { useState } from "react";
import { useParams } from "react-router-dom";
import loadingGif from "./assets/loader.gif";

const PokemonCard = ({ pokemonList }) => {
    const { id } = useParams();
    const [activeType, setActiveType] = useState("Normal"); // Déclarez tous les Hooks en haut

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

    const pokedex_id = currentPokemon.pokedex_id;
    const name = currentPokemon.name.fr;
    const pre = currentPokemon.evolution?.pre;
    const pv = currentPokemon.stats?.hp;
    const energiesTypes = currentPokemon.types;
    const imagePokemonRegular = currentPokemon.sprites?.regular;
    const imagePokemonShiny = currentPokemon.sprites?.shiny;
    const imagePokemonGmax = currentPokemon.sprites?.gmax?.regular;
    const categorie = currentPokemon.category;
    const taille = currentPokemon.height;
    const poids = currentPokemon.weight;
    return (
        <main>
            <div className="pokemon_card-container">
                <div className="title_card-container">
                    <p
                        style={{
                            color: "brown",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            border: "0.5px solid brown",
                            borderRadius: "35%",
                            padding: "5px",
                        }}
                    >
                        {!pre
                            ? "Base"
                            : pre.length < 2
                            ? "Niveau 1"
                            : "Niveau 2"}
                    </p>
                    <p>{name}</p>
                    <div className="pvTypes">
                        <span style={{ fontSize: "0.8rem" }}>pv</span> {pv}
                        {energiesTypes?.map((type, index) => (
                            <img
                                src={type.image}
                                alt="imgage type"
                                key={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="img_pokemon-container">
                    <div className="img_type-container">
                        {["Normal", "Shiny", "Gmax"].map((type, index) => (
                            <span
                                key={index}
                                className="img_type"
                                onClick={() => setActiveType(type)}
                                style={{
                                    backgroundColor:
                                        activeType === type
                                            ? "rgb(138, 127, 127, 0.8)"
                                            : "initial",
                                    cursor: "pointer",
                                }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <figure className="img_pokemon">
                        {activeType === "Normal" ? (
                            <img
                                src={imagePokemonRegular}
                                alt="image pokemon"
                            />
                        ) : activeType === "Shiny" ? (
                            <img src={imagePokemonShiny} alt="image pokemon" />
                        ) : activeType === "Gmax" ? (
                            imagePokemonGmax ? (
                                <img
                                    src={imagePokemonGmax}
                                    alt="image pokemon Gmax"
                                />
                            ) : (
                                <p>Pas de version Gmax</p>
                            )
                        ) : null}
                        <figcaption>
                            n°{pokedex_id}
                            {" - "}
                            {categorie}
                            {" - "}
                            Taille :{taille}
                            {" - "}
                            Poids :{poids}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </main>
    );
};

export default PokemonCard;
