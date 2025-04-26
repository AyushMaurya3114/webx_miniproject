from db import mongo

class FruitModel:
    @staticmethod
    def add_fruit(fruit_data):
        mongo.db.fruits.insert_one(fruit_data)

    @staticmethod
    def get_fruits():
        return list(mongo.db.fruits.find({}, {"_id": 0}))

    @staticmethod
    def delete_fruit(fruit_id):
        mongo.db.fruits.delete_one({"_id": fruit_id})
