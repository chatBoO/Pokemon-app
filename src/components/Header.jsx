import logo from "../assets/logo.png";

const Header = () => {
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
                <div>
                    <input type="text" placeholder="Rechercher un pokemon" />
                    <button>Rechercher</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
