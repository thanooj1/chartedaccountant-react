import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';

function App() {
  const [charteredAccountants, setCharteredAccountants] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCharteredAccountants(data.charteredAccountants);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chartered Accountants</h1>
      </header>

      <Routes>
      
        {/* Homepage Route - List of Chartered Accountants */}
        <Route path="/" element={<HomePage accountants={charteredAccountants} />} />
        <Route path="/searchbar" element={<SearchBar />} />

        {/* Dynamic Route for individual accountant */}
        <Route path="/accountant/:id" element={<AccountantDetails />} />
      </Routes>
    </div>
  );
}

// HomePage component for displaying the list of accountants
function HomePage({ accountants }) {
  const navigate = useNavigate();

  const handleAccountantClick = (id) => {
    navigate(`/accountant/${id}`);
  };

  return (
    <div className="account-list">
      {accountants.map((accountant) => (
        <div
          key={accountant.id}
          className="account-card"
          onClick={() => handleAccountantClick(accountant.id)}
        >
          <img src={accountant.image} alt={accountant.name} />
          <h2>{accountant.name}</h2>
          <p>{accountant.intro}</p>
          <p>Rating: {accountant.rating} ⭐</p>
          <p>Price: {accountant.price}</p>
          <p>{accountant.deliveryTime}</p>
        </div>
      ))}
    </div>
  );
}

// AccountantDetails component for displaying the individual accountant data
function AccountantDetails() {
  const { id } = useParams(); // Get the id from the URL
  const [accountant, setAccountant] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedAccountant = data.charteredAccountants.find((acc) => acc.id === parseInt(id));
        setAccountant(selectedAccountant);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!accountant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-details">
      <h2>{accountant.name}</h2>
      <img src={accountant.image} alt={accountant.name} />
      <p>{accountant.intro}</p>
      <p><strong>Rating:</strong> {accountant.rating} ⭐</p>
      <p><strong>Price:</strong> {accountant.price}</p>
      <p><strong>Delivery Time:</strong> {accountant.deliveryTime}</p>
      <p><strong>About:</strong> {accountant.about.description}</p>
      <p><strong>Testimonial:</strong> "{accountant.testimonial.text}" - {accountant.testimonial.author}</p>
    </div>
  );
}

export default App;
