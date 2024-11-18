import React from "react";

const ResultsTable = ({ results }) => {
    return (
        <div className="results-container">
            <h2>Analysis Results</h2>
            <ul className="result-list">
                <li>
                    <strong>URL:</strong>{" "}
                    <a href={results.url} target="_blank" rel="noopener noreferrer">
                        {results.url}
                    </a>
                </li>
                <li>
                    <strong>Total Readable Text:</strong> {results.totalWordCount} 
                </li>
                <li>
                    <strong>Blog/Article Content Text:</strong> {results.articleWordCount} 
                </li>
            </ul>
        </div>
    );
};

export default ResultsTable;
