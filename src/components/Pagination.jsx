import React, { useState } from "react";

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage); // Calcul du nombre total de pages
    const [pageInput, setPageInput] = useState(currentPage); // État pour gérer l'entrée utilisateur dans le champ de page

    const handlePrevious = () => {
        // Décrémente la page actuelle si possible
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setPageInput(currentPage - 1);
        }
    };

    const handleNext = () => {
        // Incrémente la page actuelle si possible
        if (currentPage < pageCount) {
            onPageChange(currentPage + 1);
            setPageInput(currentPage + 1);
        }
    };

    const handleInputChange = (e) => {
        // Gère les changements dans le champ de saisie de la page
        const value = e.target.value;
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setPageInput(value);
        }
    };

    const handleInputSubmit = (e) => {
        // Valide et applique la page saisie par l'utilisateur
        e.preventDefault();
        const pageNumber = Math.max(1, Math.min(pageCount, Number(pageInput)));
        onPageChange(pageNumber);
        setPageInput(pageNumber);
    };

    return (
        <div className="pagination-container">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1} // Désactive le bouton si on est sur la première page
                className="previous-button"
            >
                Précédent
            </button>{" "}
            <span className="page-info">
                Page {currentPage} sur {pageCount} {/* Affiche la page actuelle et le nombre total de pages */}
            </span>{" "}
            <button
                onClick={handleNext}
                disabled={currentPage === pageCount} // Désactive le bouton si on est sur la dernière page
                className="next-button"
            >
                Suivant
            </button>
            <form
                onSubmit={handleInputSubmit}
                className="page-input-form"
                style={{ display: "inline", marginLeft: "10px" }}
            >
                <input
                    type="text"
                    value={pageInput}
                    onChange={handleInputChange} // Met à jour l'état lors de la saisie d'une nouvelle page
                    className="page-input"
                    style={{ width: "50px", textAlign: "center" }}
                />
                <button type="submit">Aller</button> {/* Soumet la nouvelle page */}
            </form>
        </div>
    );
};

export default Pagination;
