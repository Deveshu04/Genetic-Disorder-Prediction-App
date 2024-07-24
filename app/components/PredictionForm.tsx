'use client'
import React, { useState, FormEvent } from 'react'

// Define types for our state
interface InputData {
    // Add properties based on your form fields
    // For example:
    // gene: string;
    // age: number;
}

interface PredictionResult {
    result: string;
}

export default function PredictionForm() {
    const [inputData, setInputData] = useState<InputData>({})
    const [prediction, setPrediction] = useState<PredictionResult | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInputData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Call your API here and set the prediction
        console.log(inputData)
        // Simulate API call
        setPrediction({ result: 'Sample prediction' })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Add your form fields here */}
            {/* Example: */}
            <input
                type="text"
                name="gene"
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Enter gene"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Predict
            </button>
            {prediction && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Prediction Result:</h2>
                    <p>{prediction.result}</p>
                </div>
            )}
        </form>
    )
}