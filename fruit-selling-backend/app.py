from flask import Flask
from flask_cors import CORS
from db import mongo  # Import only MongoDB
from routes.auth_routes import auth_routes
from routes.fruit_routes import fruit_routes
from routes.order_routes import order_routes

app = Flask(__name__)  # Initialize Flask App

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/FruitDB"
mongo.init_app(app)  # Initialize MongoDB

# Enable CORS with specific settings
CORS(app, 
    resources={r"/*": {
        "origins": "*",  # Allow all origins for now
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
    }},
    supports_credentials=True
)


# Register API Blueprints
app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(fruit_routes, url_prefix="/fruit")
app.register_blueprint(order_routes, url_prefix="/order")

# Default Route
@app.route("/")
def home():
    return {"message": "Fruit Selling API is running"}

if __name__ == "__main__":
    app.run(debug=True)