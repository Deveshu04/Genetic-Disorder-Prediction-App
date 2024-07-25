import joblib
import numpy as np
import pandas as pd
from flask_restful import Resource, reqparse, fields, marshal_with




Genetic = {
    'name': 'Genetic',
    'description': 'Genetic API'
}

parser = reqparse.RequestParser()
parser.add_argument('Patient Details', type=dict, required=True, help="Patient Details cannot be blank")
parser.add_argument('Family Medical', type=dict, required=True, help="Family Medical cannot be blank")

resource_fields = {
    'genetic_disorder': fields.String,
    'disorder_subclass': fields.String
}

# Loading model and encoder
model = joblib.load("app/ml/pipeline_model.pkl")
y_encoder = joblib.load("app/ml/y_encoder.pkl")
COLUMNS = joblib.load("app/ml/columns.pkl")

class GeneticAPI(Resource):
    def get(self):
        return Genetic
    
    @marshal_with(resource_fields)
    def post(self):
        args = parser.parse_args()

        patient_details = args['Patient Details']
        family_medical = args['Family Medical']

        data = {**patient_details, **family_medical}       
        data = pd.DataFrame(data, index=[0]).replace({None: np.nan})

        predicted_value = model.predict(data).reshape(-1, 1)
        predicted_value = y_encoder.inverse_transform(predicted_value)
        genetic_disorder, disorder_subclass = predicted_value[0][0].title().split('s-')

        response = {
            'genetic_disorder': genetic_disorder,
            'disorder_subclass': disorder_subclass
        }

        return response, 201

