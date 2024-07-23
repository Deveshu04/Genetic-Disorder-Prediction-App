from flask import Flask
# from flask_pymongo import PyMongo

# mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    # Configuration
    # app.config["MONGO_URI"] = "mongodb://localhost:27017/genetic_disorder_db"
    # mongo.init_app(app)

    # Register routes
    from .routes import main
    app.register_blueprint(main)

    return app
