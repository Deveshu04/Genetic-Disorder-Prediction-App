'use client';
import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { BackgroundBeams } from "../app/components/ui/background-beams";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface PatientData {
    age: number;
    gender: 'Male' | 'Female';
    birthDefects: 'Singular' | 'Multiple';
    bloodCellCount: number;
    whiteBloodCellCount: number;
    bloodTestResult: 'Normal' | 'Abnormal' | 'Inconclusive';
    respiratoryRate: 'Normal' | 'Tachypnea';
    heartRate: 'Normal' | 'Tachycardia';
    folicAcidDetails: 'Yes' | 'No';
    seriousMaternalIllness: 'Yes' | 'No';
    substanceAbuse: 'Yes' | 'No';
    radiationExposure: 'Yes' | 'No';
    birthAsphyxia: 'Yes' | 'No';
    maternalGenes: 'Yes' | 'No';
    paternalGenes: 'Yes' | 'No';
    maternalGene: 'Yes' | 'No';
    paternalGene: 'Yes' | 'No';
    motherAge: number;
    fatherAge: number;
    assistedConception: 'Yes' | 'No';
    previousAnomalies: 'Yes' | 'No';
    previousAbortions: '0' | '1' | '2' | '3' | '>3';
}

const defaultPatientData: PatientData = {
    age: 0,
    birthDefects: 'Singular',
    bloodCellCount: 0,
    whiteBloodCellCount: 0,
    bloodTestResult: 'Normal',
    respiratoryRate: 'Normal',
    heartRate: 'Normal',
    folicAcidDetails: 'Yes',
    seriousMaternalIllness: 'No',
    substanceAbuse: 'No',
    radiationExposure: 'No',
    birthAsphyxia: 'Yes',
    maternalGenes: 'Yes',
    paternalGenes: 'No',
    maternalGene: 'Yes',
    paternalGene: 'No',
    motherAge: 0,
    fatherAge: 0,
    assistedConception: 'No',
    previousAnomalies: 'No',
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

        {type === 'radio' ? (
            <div className="mt-1 space-x-4">
                {options.map((option) => (
                    <label key={option} className="inline-flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                            className="form-radio text-teal-500 focus:ring-2 focus:ring-teal-500"
                            style={{
                                accentColor: '#14b8a6', // This is the Tailwind teal-500 color
                                backgroundColor: 'transparent',
                                borderColor: '#14b8a6'
                            }}
                        />
                        <span className="ml-2 text-neutral-300">{option}</span>
                    </label>
                ))}
            </div>
        ) : type === 'select' ? (
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [apiResponse, setApiResponse] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('API Response:', result); // Log the API response
                setApiResponse(result);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        onClose(); // Close the modal after submission
    };

    // Helper function to determine if a field should use radio buttons
    const shouldUseRadio = (name) => {
        const field = patientData[name];
        return typeof field === 'string' && (field === 'Yes' || field === 'No' || field === 'Male' || field === 'Female');
    };

    return (
        <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
            <div className="w-full max-w-7xl mx-auto p-4 relative z-10">
                <h1 className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-8">
                    Genetic Prediction App
                </h1>
                <form className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-neutral-900/50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-teal-500 text-teal-400">Patient Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Patient Age" name="age" type="number" value={patientData.age} onChange={handleInputChange} tooltip={tooltips.age}/>
                            <InputField label="Gender" name="gender" type="radio" value={patientData.gender} onChange={handleInputChange} options={['Male', 'Female']} tooltip={tooltips.gender}/>
                            <InputField label="Birth defects" name="birthDefects" type="radio" value={patientData.birthDefects} onChange={handleInputChange} options={['Singular', 'Multiple']} tooltip={tooltips.birthDefects}/>
                            <InputField label="Blood cell count (mcL)" name="bloodCellCount" type="number" value={patientData.bloodCellCount} onChange={handleInputChange} tooltip={tooltips.bloodCellCount}/>
                            <InputField label="White Blood cell count" name="whiteBloodCellCount" type="number" value={patientData.whiteBloodCellCount} onChange={handleInputChange} tooltip={tooltips.whiteBloodCellCount}/>
                            <InputField label="Blood test result" name="bloodTestResult" type="select" value={patientData.bloodTestResult} onChange={handleInputChange} options={['Normal', 'Abnormal', 'Inconclusive']} tooltip={tooltips.bloodTestResult}/>
                            <InputField label="Respiratory Rate" name="respiratoryRate" type="radio" value={patientData.respiratoryRate} onChange={handleInputChange} options={['Normal', 'Tachypnea']} tooltip={tooltips.respiratoryRate}/>
                            <InputField label="Heart Rate" name="heartRate" type="radio" value={patientData.heartRate} onChange={handleInputChange} options={['Normal', 'Tachycardia']} tooltip={tooltips.heartRate}/>
                            <InputField label="Folic acid details" name="folicAcidDetails" type="radio" value={patientData.folicAcidDetails} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.folicAcidDetails}/>
                            <InputField label="H/O serious maternal illness" name="seriousMaternalIllness" type="radio" value={patientData.seriousMaternalIllness} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.seriousMaternalIllness}/>
                            <InputField label="H/O substance abuse" name="substanceAbuse" type="radio" value={patientData.substanceAbuse} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.substanceAbuse}/>
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
                                        <InputField label="H/O radiation exposure (x-ray)" name="radiationExposure" type="radio" value={patientData.radiationExposure} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.radiationExposure}/>
                                        <InputField label="Birth asphyxia" name="birthAsphyxia" type="radio" value={patientData.birthAsphyxia} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.birthAsphyxia}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 bg-neutral-900/50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-teal-500 text-teal-400">Family Medical History</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Genes in Mother's side" name="maternalGenes" type="radio" value={patientData.maternalGenes} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.maternalGenes}/>
                            <InputField label="Inherited from Father" name="paternalGenes" type="radio" value={patientData.paternalGenes} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.paternalGenes}/>
                            <InputField label="Maternal gene" name="maternalGene" type="radio" value={patientData.maternalGene} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.maternalGene}/>
                            <InputField label="Paternal gene" name="paternalGene" type="radio" value={patientData.paternalGene} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.paternalGene}/>
                            <InputField label="Mother's age" name="motherAge" type="number" value={patientData.motherAge} onChange={handleInputChange} tooltip={tooltips.motherAge}/>
                            <InputField label="Father's age" name="fatherAge" type="number" value={patientData.fatherAge} onChange={handleInputChange} tooltip={tooltips.fatherAge}/>
                            <InputField label="Assisted conception IVF/ART" name="assistedConception" type="radio" value={patientData.assistedConception} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.assistedConception}/>
                            <InputField label="History of anomalies in previous pregnancies" name="previousAnomalies" type="radio" value={patientData.previousAnomalies} onChange={handleInputChange} options={['Yes', 'No']} tooltip={tooltips.previousAnomalies}/>
                            <InputField label="No. of previous abortion" name="previousAbortions" type="select" value={patientData.previousAbortions} onChange={handleInputChange} options={['0', '1', '2', '3', '>3']} tooltip={tooltips.previousAbortions}/>
                        </div>
                    </div>
                </form>
                <div className="text-center mt-8">
                    <Button
                        onPress={onOpen}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                        Predict
                    </Button>
                </div>
            </div>
            <BackgroundBeams />

            <Modal
                size="lg"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black justify-center items-center">Results</ModalHeader>
                            <ModalBody>
                                <p className="text-black">
                                    Genetic Disorder: {apiResponse?.genetic_disorder || 'N/A'}
                                </p>
                                <p className="text-black">
                                    Disorder Sub-class: {apiResponse?.disorder_subclass || 'N/A'}
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button
                                    color="primary"
                                    onPress={handleSubmit}
                                    className="bg-teal-600 hover:bg-teal-700 text-white"
                                >
                                    Insights
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
