from flask import Blueprint, request, jsonify
from models.user_model import UserModel

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.json

    user = {
        "email": data["email"],
        "password": data["password"],  # No hashing
        "role": data["role"]  # 'buyer' or 'seller'
    }

    if UserModel.find_user(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    UserModel.create_user(user)
    return jsonify({"message": "User registered successfully"}), 201

@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = UserModel.find_user(data["email"])

    if user and user["password"] == data["password"]:  # Direct comparison
        return jsonify({"message": "Login successful", "role": user["role"]})

    return jsonify({"error": "Invalid credentials"}), 401
