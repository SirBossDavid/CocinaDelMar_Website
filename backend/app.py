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

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    try:
        database = client.get_database("Menu")
        gallery_collection = database.get_collection("gallery")
    except Exception as e:
        raise Exception("Unable to find the document due to the following error: ", e)
    gallery = list(gallery_collection.find())
    for item in gallery:
        item['id'] = str(item['_id'])  # convert ObjectId to string id
        del item['_id']
        item['url'] = item.get('img_url', '')  # map img_url to url
    return jsonify(gallery)
    
@app.route('/api/customs', methods=['GET'])
def get_customs():
    try:
        database = client.get_database("Menu")
        section_collection = database.get_collection("CustomSections")
    except Exception as e:
        raise Exception("Unable to find the document due to the following error: ", e)
        
    sections =  list(section_collection.find())
    for section in sections:
        section['_id'] = str(section['_id'])
    return jsonify(sections)

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