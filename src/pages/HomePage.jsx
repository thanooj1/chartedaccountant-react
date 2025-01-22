import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component

function HomePage() {
  const [accountants, setAccountants] = useState([]);

  useEffect(() => {
    const fetchAccountants = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setAccountants(data.charteredAccountants);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAccountants();
  }, []);

  const handleSelect = (id) => {
    // Navigate or show details of selected accountant
    console.log('Selected Accountant ID:', id);
  };

  return (
    <section className="container">
      <h1>Accountants</h1>

      {/* Enhanced SearchBar */}
      <div className="search-bar">
        <SearchBar onSelect={handleSelect} />
      </div>

      {accountants.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {accountants.map(accountant => (
            <div key={accountant.id} className="account-card">
              <img src={accountant.image} alt={accountant.name} />
              <div>
                <h2>{accountant.name}</h2>
                <p>{accountant.intro}</p>
                <p className="rating">Rating: {accountant.rating} ⭐</p>
                <p className="price">Price: {accountant.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Chartered Accountants. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy-policy">Privacy Policy</a> | <a href="#terms-of-service">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}

export default HomePage;
