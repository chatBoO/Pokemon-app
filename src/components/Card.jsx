import { Link } from "react-router-dom";

const Card = ({ id, name, img, types, hp, pre, generation }) => {
    return (
        <Link to={`/card/${id}`}>
            {/* Conteneur principal de la carte Pokémon */}
            <div className="pokemon_card">
                {/* Section du titre de la carte */}
                <div className="title_card">
                    <p>N° {id}</p>
                    <p>{name}</p>
                    {/* Affiche le niveau d'évolution du Pokémon */}
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
                </div>

                {/* Conteneur des informations principales */}
                <div className="infos-container">
                    {/* Image du Pokémon */}
                    <div className="pokemon_img">
                        <img src={img} alt={`Image de ${name}`} />
                    </div>

                    {/* Informations détaillées sur le Pokémon */}
                    <div className="infos_card">
                        <h4>Informations :</h4>
                        <span className="informations_title">
                            Points de vie : {hp}
                        </span>
                        
                        {/* Affiche "Type" ou "Types" selon le nombre de types */}
                        {types && types.length > 1 ? (
                            <span className="informations_title">Types : </span>
                        ) : (
                            <span className="informations_title">Type : </span>
                        )}
                        
                        {/* Liste des types du Pokémon */}
                        <ul>
                            {types && types.length > 0 ? (
                                types.map((type, index) => (
                                    <li key={index} className="infos">
                                        {type.name}
                                        <img
                                            src={type.image}
                                            alt={`Type ${type.name}`}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li className="infos">Inconnu</li>
                            )}
                        </ul>

                        {/* Affiche la génération du Pokémon */}
                        <span className="informations_title">
                            Génération : {generation}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
