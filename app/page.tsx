'use client';
import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { BackgroundBeams } from "../app/components/ui/background-beams";

interface PatientData {
    age: number;
    gender: 'M' | 'F';
    birthDefects: 'Singular' | 'Multiple';
    bloodCellCount: number;
    whiteBloodCellCount: number;
    bloodTestResult: 'Normal' | 'Abnormal' | 'Inconclusive';
    respiratoryRate: 'Normal' | 'Tachypnea';
    heartRate: 'Normal' | 'Tachycardia';
    folicAcidDetails: 'Y' | 'N';
    seriousMaternalIllness: 'Y' | 'N';
    substanceAbuse: 'Y' | 'N';
    radiationExposure: 'Y' | 'N';
    birthAsphyxia: 'Y' | 'N';
    maternalGenes: 'Y' | 'N';
    paternalGenes: 'Y' | 'N';
    maternalGene: 'Y' | 'N';
    paternalGene: 'Y' | 'N';
    motherAge: number;
    fatherAge: number;
    assistedConception: 'Y' | 'N';
    previousAnomalies: 'Y' | 'N';
    previousAbortions: '0' | '1' | '2' | '3' | '>3';
}

const defaultPatientData: PatientData = {
    age: 0,
    gender: 'M',
    birthDefects: 'Singular',
    bloodCellCount: 0,
    whiteBloodCellCount: 0,
    bloodTestResult: 'Normal',
    respiratoryRate: 'Normal',
    heartRate: 'Normal',
    folicAcidDetails: 'Y',
    seriousMaternalIllness: 'N',
    substanceAbuse: 'N',
    radiationExposure: 'N',
    birthAsphyxia: 'Y',
    maternalGenes: 'Y',
    paternalGenes: 'N',
    maternalGene: 'Y',
    paternalGene: 'N',
    motherAge: 0,
    fatherAge: 0,
    assistedConception: 'N',
    previousAnomalies: 'N',
    previousAbortions: '0',
};

const tooltips = {
    age: "Patient's current age in years",
    gender: "Patient's biological sex",
    birthDefects: "Type of birth defects observed",
    bloodCellCount: "Number of blood cells per microliter",
    whiteBloodCellCount: "Number of white blood cells per microliter",
    bloodTestResult: "Overall blood test result",
    respiratoryRate: "Patient's breathing rate",
    heartRate: "Patient's heart rate",
    folicAcidDetails: "Whether folic acid was taken during pregnancy",
    seriousMaternalIllness: "History of serious maternal illness",
    substanceAbuse: "History of substance abuse",
    radiationExposure: "History of radiation exposure",
    birthAsphyxia: "Whether birth asphyxia occurred",
    maternalGenes: "Presence of relevant genes on mother's side",
    paternalGenes: "Inherited genes from father",
    maternalGene: "Specific maternal gene presence",
    paternalGene: "Specific paternal gene presence",
    motherAge: "Age of the patient's mother",
    fatherAge: "Age of the patient's father",
    assistedConception: "Whether assisted conception methods were used",
    previousAnomalies: "History of anomalies in previous pregnancies",
    previousAbortions: "Number of previous abortions",
};

const InputField = ({ label, name, type, value, onChange, options, tooltip }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-300 mb-1 flex items-center">
            {label}
            <span className="ml-1 text-neutral-400 hover:text-neutral-200 cursor-help" title={tooltip}>
                <InfoIcon size={16}/>
            </span>
        </label>

        {type === 'select' ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 bg-neutral-950 text-neutral-300 placeholder:text-neutral-700"
            >
                {options.map((option) => (
                    <option key={option} value={option} className="text-neutral-300 bg-neutral-950">
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 bg-neutral-950 text-neutral-300 placeholder:text-neutral-700"
            />
        )}
    </div>
);

export default function Home() {
    const [patientData, setPatientData] = useState(defaultPatientData);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Patient Data:', patientData);
        // Here you would typically send the data to your API
    };

    return (
        <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
            <div className="w-full max-w-7xl mx-auto p-4 relative z-10">
                <h1 className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-8">
                    Genetic Prediction App
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-neutral-900/50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-teal-500 text-teal-400">Patient Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Patient Age" name="age" type="number" value={patientData.age} onChange={handleInputChange} tooltip={tooltips.age}/>
                            <InputField label="Gender" name="gender" type="select" value={patientData.gender} onChange={handleInputChange} options={['M', 'F']} tooltip={tooltips.gender}/>
                            <InputField label="Birth defects" name="birthDefects" type="select" value={patientData.birthDefects} onChange={handleInputChange} options={['Singular', 'Multiple']} tooltip={tooltips.birthDefects}/>
                            <InputField label="Blood cell count (mcL)" name="bloodCellCount" type="number" value={patientData.bloodCellCount} onChange={handleInputChange} tooltip={tooltips.bloodCellCount}/>
                            <InputField label="White Blood cell count" name="whiteBloodCellCount" type="number" value={patientData.whiteBloodCellCount} onChange={handleInputChange} tooltip={tooltips.whiteBloodCellCount}/>
                            <InputField label="Blood test result" name="bloodTestResult" type="select" value={patientData.bloodTestResult} onChange={handleInputChange} options={['Normal', 'Abnormal', 'Inconclusive']} tooltip={tooltips.bloodTestResult}/>
                            <InputField label="Respiratory Rate" name="respiratoryRate" type="select" value={patientData.respiratoryRate} onChange={handleInputChange} options={['Normal', 'Tachypnea']} tooltip={tooltips.respiratoryRate}/>
                            <InputField label="Heart Rate" name="heartRate" type="select" value={patientData.heartRate} onChange={handleInputChange} options={['Normal', 'Tachycardia']} tooltip={tooltips.heartRate}/>
                            <InputField label="Folic acid details" name="folicAcidDetails" type="select" value={patientData.folicAcidDetails} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.folicAcidDetails}/>
                            <InputField label="H/O serious maternal illness" name="seriousMaternalIllness" type="select" value={patientData.seriousMaternalIllness} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.seriousMaternalIllness}/>
                            <InputField label="H/O substance abuse" name="substanceAbuse" type="select" value={patientData.substanceAbuse} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.substanceAbuse}/>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                                className="text-teal-400 hover:text-teal-300 font-medium"
                            >
                                {showAdditionalInfo ? '▼ ' : '► '}Additional Information
                            </button>
                            {showAdditionalInfo && (
                                <div className="mt-4 bg-neutral-800/50 p-4 rounded-md">
                                    <h3 className="text-lg font-medium mb-3 text-teal-400">Additional Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="H/O radiation exposure (x-ray)" name="radiationExposure" type="select" value={patientData.radiationExposure} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.radiationExposure}/>
                                        <InputField label="Birth asphyxia" name="birthAsphyxia" type="select" value={patientData.birthAsphyxia} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.birthAsphyxia}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 bg-neutral-900/50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-teal-500 text-teal-400">Family Medical History</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Genes in Mother's side" name="maternalGenes" type="select" value={patientData.maternalGenes} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.maternalGenes}/>
                            <InputField label="Inherited from Father" name="paternalGenes" type="select" value={patientData.paternalGenes} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.paternalGenes}/>
                            <InputField label="Maternal gene" name="maternalGene" type="select" value={patientData.maternalGene} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.maternalGene}/>
                            <InputField label="Paternal gene" name="paternalGene" type="select" value={patientData.paternalGene} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.paternalGene}/>
                            <InputField label="Mother's age" name="motherAge" type="number" value={patientData.motherAge} onChange={handleInputChange} tooltip={tooltips.motherAge}/>
                            <InputField label="Father's age" name="fatherAge" type="number" value={patientData.fatherAge} onChange={handleInputChange} tooltip={tooltips.fatherAge}/>
                            <InputField label="Assisted conception IVF/ART" name="assistedConception" type="select" value={patientData.assistedConception} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.assistedConception}/>
                            <InputField label="History of anomalies in previous pregnancies" name="previousAnomalies" type="select" value={patientData.previousAnomalies} onChange={handleInputChange} options={['Y', 'N']} tooltip={tooltips.previousAnomalies}/>
                            <InputField label="No. of previous abortion" name="previousAbortions" type="select" value={patientData.previousAbortions} onChange={handleInputChange} options={['0', '1', '2', '3', '>3']} tooltip={tooltips.previousAbortions}/>
                        </div>
                    </div>
                </form>
                <div className="text-center mt-8">
                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                        Predict
                    </button>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}