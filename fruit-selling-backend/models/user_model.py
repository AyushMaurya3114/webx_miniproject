from db import mongo

class UserModel:
    @staticmethod
    def create_user(user_data):
        mongo.db.users.insert_one(user_data)

    @staticmethod
    def find_user(email):
        return mongo.db.users.find_one({"email": email})
