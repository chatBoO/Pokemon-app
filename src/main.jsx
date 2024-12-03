import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import App from "./App.jsx";
import Header from "./components/Header.jsx";

function Main() {
    const [userSearch, setUserSearch] = useState("");

    return (
        <>
            <Header onSearch={setUserSearch} />
            <App userSearch={userSearch} />
        </>
    );
}

createRoot(document.getElementById("root")).render(<Main />);
