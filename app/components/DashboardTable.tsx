'use client'
import { useState, useEffect } from 'react'

// Define an interface for the prediction object
interface Prediction {
    id: number;
    input: string;
    result: string;
}

export default function DashboardTable() {
    // Explicitly type the state as an array of Prediction
    const [predictions, setPredictions] = useState<Prediction[]>([])

    useEffect(() => {
        // Fetch predictions from your API
        // For now, we'll use sample data
        const samplePredictions: Prediction[] = [
            { id: 1, input: 'Sample input 1', result: 'Sample result 1' },
            { id: 2, input: 'Sample input 2', result: 'Sample result 2' },
        ]
        setPredictions(samplePredictions)
    }, [])

    return (
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Input</th>
                <th className="py-2 px-4 border-b">Result</th>
            </tr>
            </thead>
            <tbody>
            {predictions.map((prediction) => (
                <tr key={prediction.id}>
                    <td className="py-2 px-4 border-b">{prediction.id}</td>
                    <td className="py-2 px-4 border-b">{prediction.input}</td>
                    <td className="py-2 px-4 border-b">{prediction.result}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}