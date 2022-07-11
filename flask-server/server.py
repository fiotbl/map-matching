from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

googleMapsApiKey = os.getenv("REACT_APP_GOOGLE_API_KEY")
url = "https://roads.googleapis.com/v1/snapToRoads?path=-35.27801%2C149.12958%7C-35.28032%2C149.12907%7C-35.28099%2C149.12929%7C-35.28144%2C149.12984%7C-35.28194%2C149.13003%7C-35.28282%2C149.12956%7C-35.28302%2C149.12881%7C-35.28473%2C149.12836&interpolate=true&key=" + googleMapsApiKey
payload={}
headers = {}

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Mem1", "Mem2", "Mem3"]}

@app.route('/result', methods = ['POST'])
def result():
    geopoints = request.json
    if geopoints:
       print(geopoints)
       response = requests.request("GET", url, headers=headers, data=payload)
       print(response.text)
    
       return jsonify(geopoints)
    

    return "No geopoints receieved"

if __name__ == "__main__":
    app.run(debug=True)