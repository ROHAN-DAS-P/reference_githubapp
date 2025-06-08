import React, { useState } from 'react';
import Header from '../components/Header';

export default function Search() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('user');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/repo/search?q=${encodeURIComponent(query)}&type=${type}`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Search failed');
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">🔍 Search Repositories</h2>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type repository name..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="user">My Repositories</option>
            <option value="global">Global Repositories</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-blue-500">Loading results...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            {results.map((repo) => (
              <div
                key={repo.id}
                className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-700">{repo.full_name}</h3>
                <p className="text-gray-700">{repo.description || 'No description provided.'}</p>
                {repo.stars !== undefined && (
                  <p className="text-gray-600">⭐ {repo.stars} stars</p>
                )}
                {repo.owner && (
                  <p className="text-gray-600">👤 Owner: {repo.owner}</p>
                )}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !loading && query && (
          <p className="text-gray-500 mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}
