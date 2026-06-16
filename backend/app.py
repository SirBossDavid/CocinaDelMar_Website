import os
from flask import Flask, jsonify
from flask_cors import CORS

from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv 

load_dotenv()

app = Flask(__name__)
CORS(app)

uri = os.getenv("MONGO_URI")

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    database = client.get_database("Menu")
    menu_collection = database.get_collection("Items")
      
except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)

@app.route('/api/menu', methods=['GET'])
def get_menu():
    items = list(menu_collection.find())
    for item in items:
        item['_id'] = str(item['_id'])  # convert ObjectId to string
    return jsonify(items)

@app.route('/')
def index():
    return {'message': 'Restaurant API is running!'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5010)