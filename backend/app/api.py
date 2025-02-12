from re import A
import joblib
import json
import numpy as np
import pandas as pd
from flask_restful import Resource, reqparse, fields, marshal_with

# api details
API_DETAILS = json.load(open("app/api_details.json"))

# Request parser
parser = reqparse.RequestParser()
parser.add_argument('patient_details', type=dict, required=True, help="Patient Details cannot be blank")
parser.add_argument('family_history', type=dict, required=True, help="Family Medical cannot be blank")

# Resource fields
resource_fields = {
    'genetic_disorder': fields.String,
    'disorder_subclass': fields.String
}

# Loading model and encoder
model = joblib.load("app/ml/pipeline_model.pkl")
y_encoder = joblib.load("app/ml/y_encoder.pkl")

class GeneticAPI(Resource):
    def get(self):
        return API_DETAILS
    
    @marshal_with(resource_fields)
    def post(self):
        args = parser.parse_args()

        patient_details = args['patient_details']
        family_medical = args['family_history']

        data = {**patient_details, **family_medical}
        data["blood_test_result"] = data["blood_test_result"].lower()
        data = pd.DataFrame(data, index=[0]).replace({None: np.nan})

        predicted_value = model.predict(data).reshape(-1, 1)
        predicted_value = y_encoder.inverse_transform(predicted_value)
        genetic_disorder, disorder_subclass = predicted_value[0][0].title().split('s-')

        response = {
            'genetic_disorder': genetic_disorder,
            'disorder_subclass': disorder_subclass
        }

        return response, 201

