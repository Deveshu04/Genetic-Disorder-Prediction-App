from flask_restful import Resource, Api
from flask import request

Genetic = {
    'name': 'Genetic',
    'description': 'Genetic API'
}

class GeneticAPI(Resource):
    def get(self):
        return Genetic
    
    def post(self):
        data = request.get_json()
        if data is None:
            return {"error": "Invalid JSON data"}, 400

        print("Received data:", data)

        expected_patient_keys = [
            "History", "Patient Age", "Gender", "Birth defects", 
            "Blood cell count (mcL)", "White Blood cell count (thousand per microliter)",
            "Blood test result", "Respiratory Rate", "Heart Rate", "Folic acid details",
            "H/O serious maternal illness", "H/O substance abuse"
        ]
        expected_family_keys = [
            "Genes in Mother's side", "Inherited from Father", "Maternal gene", 
            "Paternal gene", "Mother's age", "Father's age", 
            "Assisted conception IVF/ART", "History of anomalies in previous pregnancies",
            "No. of previous abortion"
        ]

        patient_details = {}
        family_medical = {}

        for key in expected_patient_keys:
            patient_details[key] = data.get(key, None)
            print(f"Key: {key}, Value: {data.get(key, None)}")

        for key in expected_family_keys:
            family_medical[key] = data.get(key, None)
            print(f"Key: {key}, Value: {data.get(key, None)}")

        response = {
            "Patient Details": patient_details,
            "Family Medical": family_medical,
            "Key": "Here is the output of this api"
        }
        
        print("Response data:", response)
        return response, 201

