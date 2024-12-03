import { Link } from "react-router-dom";

const Card = ({ id, name, img, types, hp, pre, generation }) => {
    return (
        <div className="pokemon_card">
            <div className="title_card">
                <p>N° {id}</p>
                <p>{name}</p>
                <p
                    style={{
                        color: "brown",
                        fontSize: "0.7rem",
                        border: "0.5px solid brown",
                        borderRadius: "35%",
                        padding: "5px",
                    }}
                >
                    {!pre ? "Base" : pre.length < 2 ? "Niveau 1" : "Niveau 2"}
                </p>
            </div>
            <div className="infos-container">
                <div className="pokemon_img">
                    <img src={img} alt="" />
                </div>
                <div className="infos_card">
                    <h4>Informations :</h4>
                    <span className="informations_title">
                        Points de vie : {hp}
                    </span>
                    {types && types.length > 1 ? (
                        <span className="informations_title">Types : </span>
                    ) : (
                        <span className="informations_title">Type : </span>
                    )}
                    <ul>
                        {types && types.length > 0 ? (
                            types.map((type, index) => (
                                <li key={index} className="infos">
                                    {type.name} <img src={type.image} alt="image type" />
                                </li>
                            ))
                        ) : (
                            <li className="infos">Inconnu</li>
                        )}
                    </ul>
                    <span className="informations_title">
                        Génération : {generation}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
