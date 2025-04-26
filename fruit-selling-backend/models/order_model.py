from db import mongo
from bson import ObjectId
import datetime

class OrderModel:
    @staticmethod
    def create_order(order_data):
        if '_id' not in order_data:
            order_data['_id'] = str(ObjectId())
        
        if 'orderDate' not in order_data:
            order_data['orderDate'] = datetime.datetime.utcnow().isoformat()
            
        mongo.db.orders.insert_one(order_data)
        return order_data

    @staticmethod
    def get_orders(user_email):
        orders = list(mongo.db.orders.find({"email": user_email}))
        for order in orders:
            if '_id' in order and isinstance(order['_id'], ObjectId):
                order['_id'] = str(order['_id'])
        return orders