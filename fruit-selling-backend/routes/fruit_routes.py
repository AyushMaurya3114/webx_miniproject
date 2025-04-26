from flask import Blueprint, request, jsonify
from models.fruit_model import FruitModel

fruit_routes = Blueprint("fruit_routes", __name__)

@fruit_routes.route("/add-fruit", methods=["POST"])
def add_fruit():
    data = request.json
    if not data or "name" not in data or "price" not in data:
        return jsonify({"error": "Missing required fields"}), 422  # Add validation

    FruitModel.add_fruit(data)
    return jsonify({"message": "Fruit added successfully"}), 201

@fruit_routes.route("/get-fruits", methods=["GET"])
def get_fruits():
    fruits = FruitModel.get_fruits()
    return jsonify(fruits)

@fruit_routes.route("/add-fruits", methods=["POST"])
def add_fruits():
    try:
        fruits_to_add = [
            {"name": "Apple", "color": "Red", "price": 120, "unit": "kg", "image": "https://www.bing.com/images/search?q=apple&cbn=KnowledgeCard&stid=acb22769-bd31-71c6-b017-def610dd57ff&thid=OSK.HEROCLICKTHROUGHYmUV6apS7Gg_ahxsVx0SL5jOzPewoVv0nuzin9x_is4&FORM=KCHIMM"},
            {"name": "Banana", "color": "Yellow", "price": 50, "unit": "dozen", "image": "https://media.gettyimages.com/id/1728563/photo/bananas.jpg?b=1&s=594x594&w=0&k=20&c=TMfSEXIOoOHT6NFuad-dJcLLi2A_tufn5dJAcoqwgb8="},
            {"name": "Orange", "color": "Orange", "price": 80, "unit": "kg", "image": "https://www.bing.com/images/search?view=detailV2&ccid=2r2luQOA&id=1A1CBFAA17FF2FF26A77294BD0DF053B892257C3&thid=OIP.2r2luQOAtJOuHn7tmrLphgHaE7&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.dabda5b90380b493ae1e7eed9ab2e986%3frik%3dw1ciiTsF39BLKQ%26riu%3dhttp%253a%252f%252fstockarch.com%252ffiles%252f15%252f12%252fwhole_orange.jpg%26ehk%3d5rr9EB2jJ79C0fsedpXe%252f%252b08mB0fmpR0FF6CJonVWuI%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=2329&expw=3500&q=orange&simid=608017059202420226&FORM=IRPRST&ck=BBC47559E3371FF268790EF51A4B0FDE&selectedIndex=0&itb=0"},
            {"name": "Grapes", "color": "Purple", "price": 150, "unit": "kg", "image": "https://www.bing.com/images/search?view=detailV2&ccid=mhEQxYzD&id=462E687CA268EED91A7E2A3F1D77071085A41806&thid=OIP.mhEQxYzDIWGxiMAmqGtlYgHaEo&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.9a1110c58cc32161b188c026a86b6562%3frik%3dBhikhRAHdx0%252fKg%26riu%3dhttp%253a%252f%252fimages6.fanpop.com%252fimage%252fphotos%252f34700000%252fGrapes-fruit-34733392-2560-1600.jpg%26ehk%3dZ62yQm%252fqhNYF81CeX3mf4wp0yiPnVzERrfSjPReYTnc%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=1600&expw=2560&q=grapes&simid=608013606059117279&FORM=IRPRST&ck=7D92B9836937C60F6B6EB7408DBB0E92&selectedIndex=6&itb=0"},
            {"name": "Mango", "color": "Yellow", "price": 100, "unit": "kg", "image": "https://www.bing.com/images/search?view=detailV2&ccid=nXJXVJ%2bG&id=36DCE9139F62FD5726C9F6865CA97471084ADBB0&thid=OIP.nXJXVJ-GIYCRFQMDcz9vLQHaEo&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.9d7257549f86218091150303733f6f2d%3frik%3dsNtKCHF0qVyG9g%26riu%3dhttp%253a%252f%252fcheckall.in%252fwp-content%252fuploads%252f2016%252f07%252fMango-benefits.jpg%26ehk%3do7yAeoY28hZHIKkRPiFQHb%252b4EXUjmrcEdCyB6%252fXSA0w%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=800&expw=1280&q=mango&simid=607992161260757278&FORM=IRPRST&ck=605AB06C1853D640201B18D453B8FD27&selectedIndex=4&itb=0"},
            {"name": "Watermelon", "color": "Green", "price": 30, "unit": "piece", "image": "https://th.bing.com/th/id/OIP.I0EBTP_XlwWA7Ox5m3QPlQHaHK?rs=1&pid=ImgDetMain"},
            {"name": "Pineapple", "color": "Yellow", "price": 40, "unit": "piece", "image": "https://www.bing.com/images/search?view=detailV2&ccid=eN9%2b%2bRq%2f&id=36DF3DB1F9729F29CB53BD1C11340B565959058A&thid=OIP.eN9--Rq_Tu_kx_iBOniJtwHaFx&mediaurl=https%3a%2f%2fwww.theproducemoms.com%2fwp-content%2fuploads%2f2018%2f08%2fpineapple.jpg&exph=1558&expw=2000&q=pineapple&simid=608036725864612774&FORM=IRPRST&ck=EEE26A9A75DD350C4C6F66FD530ECD80&selectedIndex=9&itb=0"},
            {"name": "Peach", "color": "Pink", "price": 120, "unit": "kg", "image": "https://www.bing.com/images/search?view=detailV2&ccid=V9TfglRh&id=4BE57891CBA8F6B50A9BB7934A54802A5A5A266D&thid=OIP.V9TfglRhTU3t1O4S6aBFmAHaE4&mediaurl=https%3a%2f%2fonlinescoops.com%2fwp-content%2fuploads%2f2020%2f01%2fPeach-R46-pkg.jpg&exph=787&expw=1193&q=peach&simid=608010079881542710&FORM=IRPRST&ck=2B5FE12C151EDAE3AFF702338F2A35A2&selectedIndex=0&itb=0"},
        ]
        
        # Call the add_multiple_fruits function to insert fruits
        added_fruit_ids = FruitModel.add_multiple_fruits(fruits_to_add)
        
        # Return the response
        return jsonify({"message": "Fruits added successfully!", "fruit_ids": added_fruit_ids}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
