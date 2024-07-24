from flask import Blueprint, jsonify
# from . import mongo
# import joblib
# import pandas as pd

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": 'Hello, Genetic Disorder Backend here!'})