from flask import Flask
from flask_cors import CORS
from flask_restful import Api

# mongo = PyMongo()


def create_app():
    app = Flask(__name__)
    api = Api(app)
    CORS(app, resources={
        r"/api/predict": {
            "origins": "http://localhost:3000",
            "methods": ["POST"]
        }
    })

    # Configuration
    # app.config["MONGO_URI"] = "mongodb://localhost:27017/genetic_disorder_db"
    # mongo.init_app(app)

    # Register routes
    from .routes import main
    from .api import GeneticAPI
    app.register_blueprint(main)
    api.add_resource(GeneticAPI, "/api/predict")

    return app
