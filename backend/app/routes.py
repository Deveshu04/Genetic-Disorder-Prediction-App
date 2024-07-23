from flask import Blueprint
# from . import mongo
# import joblib
# import pandas as pd

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Hello, Genetic Disorder API here!'