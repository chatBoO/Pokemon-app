import React from "react";
import logo from "../assets/logo.png";

const Header = ({ onSearch }) => {
    return (
        <header>
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="logo bulbizarre" />
                    <div className="title-container">
                        <h1>Poke-App</h1>
                        Bienvenue sur ton pokédex personnel Kylian !
                    </div>
                </div>
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Rechercher un pokemon"
                        onChange={(e) => onSearch(e.target.value.toLowerCase())}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
