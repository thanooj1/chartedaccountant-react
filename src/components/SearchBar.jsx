// SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      try {
        const response = await axios.get(`http://localhost:5000?name_like=${searchQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for Chartered Accountants..."
        value={query}
        onChange={handleSearch}
        className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul>
          {results.map((ca) => (
            <li
              key={ca.id}
              onClick={() => onSelect(ca.id)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
            >
              {ca.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
