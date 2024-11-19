import React, { useState } from 'react';
import axios from 'axios';

const URLForm = ({ setResults, setLoading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults(null);
        setError(null);

        if (!url || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(url)) {
            setError('Please enter a valid URL.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/scrape', { url });
                setResults(response.data);
                // setLoading(true);
        } catch (err) {
            setError('Failed to fetch data. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md animate-fadeIn">
                    <h1 className="text-2xl font-heading text-primary text-center mb-4">
                        Analyze Your Web Page
                    </h1>
                    <p className="text-gray-600 text-sm text-center mb-6">
                        Enter the URL to extract and analyze its content.
                    </p>
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={setLoading}
                        className={`w-full mt-4 ${
                            setLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-600'
                        } text-white py-2 rounded-lg transition`}
                    >
                        {setLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default URLForm;
