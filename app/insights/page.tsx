// components/InsightCharts.js
import React, { useEffect, useState } from 'react';
import { Pie, Bar, Histogram } from 'react-chartjs-2';

const InsightCharts = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    if (!data) return <p>Loading...</p>;

    // Example data processing (replace with your actual data logic)
    const pieData = {
        labels: ['Yes', 'No'],
        datasets: [{
            data: [data.yesCount, data.noCount],
            backgroundColor: ['#36A2EB', '#FF6384'],
        }]
    

    const barData = {
        labels: ['Normal', 'Abnormal', 'Slightly Abnormal', 'Inconclusive'],
        datasets: [{
            label: 'Blood Test Results',
            data: [data.normal, data.abnormal, data.slightlyAbnormal, data.inconclusive],
            backgroundColor: 'rgba(75,192,192,0.4)',
        }]
    };

    const histogramData = {
        labels: data.ageBuckets,
        datasets: [{
            label: 'Age Distribution',
            data: data.ageCounts,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h2>Pie Chart</h2>
            <Pie data={pieData} />
            <h2>Bar Chart</h2>
            <Bar data={barData} />
            <h2>Histogram</h2>
            <Histogram data={histogramData} />
        </div>
    );
};

export default InsightCharts;
