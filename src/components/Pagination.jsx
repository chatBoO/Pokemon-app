import React, { useState } from "react";

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const [pageInput, setPageInput] = useState(currentPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setPageInput(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageCount) {
            onPageChange(currentPage + 1);
            setPageInput(currentPage + 1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setPageInput(value);
        }
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        const pageNumber = Math.max(1, Math.min(pageCount, Number(pageInput)));
        onPageChange(pageNumber);
        setPageInput(pageNumber);
    };

    return (
        <div className="pagination-container">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="previous-button"
            >
                Précédent
            </button>{" "}
            <span className="page-info">
                Page {currentPage} sur {pageCount}
            </span>{" "}
            <button
                onClick={handleNext}
                disabled={currentPage === pageCount}
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
                    onChange={handleInputChange}
                    className="page-input"
                    style={{ width: "50px", textAlign: "center" }}
                />
                <button type="submit">Aller</button>
            </form>
        </div>
    );
};

export default Pagination;
