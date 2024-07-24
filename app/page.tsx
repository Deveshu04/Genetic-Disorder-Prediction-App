'use client'
import PredictionForm from './components/PredictionForm'
import { useState, useEffect } from 'react'

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Genetic Prediction</h1>
            <PredictionForm />
            {data ? (
                <div>
                <h2>API Response:</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

