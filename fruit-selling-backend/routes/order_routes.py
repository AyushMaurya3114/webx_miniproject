from flask import Blueprint, request, jsonify
from models.order_model import OrderModel

order_routes = Blueprint("order_routes", __name__)

@order_routes.route("/place-order", methods=["POST"])
def place_order():
    data = request.json
    print("Received order data:", data) 

    if "email" not in data or not data["email"]:
        return jsonify({"error": "Email is required to place an order"}), 400

    OrderModel.create_order(data)
    return jsonify({"message": "Order placed successfully"}), 201

@order_routes.route("/get-orders", methods=["GET"])
def get_orders():
    email = request.args.get("email")

    if not email:
        return jsonify({"error": "Email parameter is required"}), 400

    orders = OrderModel.get_orders(email)
    return jsonify(orders)

