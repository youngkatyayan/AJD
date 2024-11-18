import React, { useState } from "react";
import URLForm from "./components/URLForm";
import ResultsTable from "./components/ResultsTable";
import "./App.css";

const App = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <h1>Web Text Scraper</h1>
            <URLForm setResults={setResults} setLoading={setLoading} />
            {loading && <p>Loading...</p>}
            {results && <ResultsTable results={results} />}
        </div>
    );
};

export default App;
