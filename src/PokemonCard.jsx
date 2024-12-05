import { useParams } from "react-router-dom";
import loadingGif from "./assets/loader.gif";

const PokemonCard = ({ pokemonList }) => {
    const { id } = useParams();
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

    return (
        <main>
            <div className="pokemon_card-container">
                <div className="title_card">
                    <p
                        style={{
                            color: "brown",
                            fontSize: "0.7rem",
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
                    <p>N° {pokedex_id}</p>
                    <p>{name}</p>
                </div>
            </div>
        </main>
    );
};

export default PokemonCard;
