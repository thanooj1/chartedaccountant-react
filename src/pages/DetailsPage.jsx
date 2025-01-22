import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const { id } = useParams(); // Capture the dynamic `id` from the URL
  const [accountant, setAccountant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the db.json file
  useEffect(() => {
    const fetchAccountantData = async () => {
      try {
        const response = await fetch('/db.json'); // This assumes db.json is in the public folder
        const data = await response.json();

        // Check the fetched data in the console
        console.log('Fetched data:', data);

        // Make sure data.charteredAccountants exists before trying to find an accountant
        if (data && data.charteredAccountants) {
          const selectedAccountant = data.charteredAccountants.find(accountant => accountant.id === parseInt(id));
          setAccountant(selectedAccountant);
        } else {
          console.error('charteredAccountants not found in db.json');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountantData();
  }, [id]); // Dependency array ensures the effect runs when the `id` changes

  if (loading) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  if (!accountant) {
    return <div>Accountant not found.</div>; // Handle case if no accountant matches the ID
  }

  return (
    <div>
      <h1>Details Page</h1>
      <h2>{accountant.name}</h2>
      <img src={accountant.image} alt={accountant.name} />
      <p>{accountant.description}</p>
      <p><strong>Price: {accountant.price}</strong></p>
    </div>
  );
}

export default DetailsPage;
