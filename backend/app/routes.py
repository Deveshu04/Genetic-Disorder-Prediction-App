from flask import Blueprint, jsonify
# from . import mongo
import joblib
import numpy as np
import pandas as pd

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return jsonify({"message": 'Hello, Genetic Disorder Backend here!'})


# # Load the model
model = joblib.load("app/ml/pipeline_model.pkl")
y_encoder = joblib.load("app/ml/y_encoder.pkl")
COLUMNS = joblib.load("app/ml/columns.pkl")


@main.route('/check_model')
def check_model():
    data = pd.DataFrame(
        [[0.0, 'Female', 'Singular', 4.570249178007259, 10.383094387825404, 'normal', 'Normal (30-60)', 'Normal', 'No', 'Yes', 'No', 'No', 'No', 'Yes', 'No', 'No', 'Yes', 49.0, np.nan, 'No', 'No', 4.0]],
        columns=COLUMNS
        )
    print(data)

    predicted_value = model.predict(data).reshape(-1, 1)
    predicted_value = y_encoder.inverse_transform(predicted_value)
    print(predicted_value)
    genetic_disorder, disorder_subclass = predicted_value[0][0].title().split('s-') # s to take care of plural
    print(genetic_disorder, disorder_subclass)
    return jsonify({
        "status": "success",
        "genetic_disorder": genetic_disorder,
        "disorder_subclass": disorder_subclass
    })
