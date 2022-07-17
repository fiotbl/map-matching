from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import json

app = Flask(__name__)
CORS(app)

googleMapsApiKey = os.getenv("REACT_APP_GOOGLE_API_KEY")

# path = "60.170880,24.942795|60.170879,24.942796|60.170877,24.942796"
googleurl = "https://roads.googleapis.com/v1/snapToRoads?path=" 
interpolate = "&interpolate=true&key=" 

def convert_request(response):
    geopoints_list = []
    json_data = json.loads(response.text)
    snapped_points = list(json_data.values())[0]
    for item in snapped_points:
        for key, value in item.items():
            print(key, value)
            if key == "location":
                indiv_geopoints = {}
                for location_key, location_value in value.items():
                    if location_key == "latitude":
                        indiv_geopoints["lat"] = location_value
                    elif location_key == "longitude":
                        indiv_geopoints["lng"] = location_value
                    # print(location_key, location_value)
                geopoints_list.append(indiv_geopoints)
    return geopoints_list

@app.route('/result', methods = ['POST', 'GET'])
def result():
    geopoints = request.json
    path = ""
    geopoints_list =[]
    if geopoints:
        geopointslatlng = list(geopoints.values())[0]
        for item in geopointslatlng:
           for key, value in item.items():
                if key == "lat":
                   path += str(value) + ","
                elif key == "lng":
                    path += str(value) + "|"
        url = googleurl + path[:-1] + interpolate + googleMapsApiKey
        payload={}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        geopoints_list = convert_request(response)

        print(geopoints_list)
        return str(geopoints_list)

    return "No geopoints receieved"

if __name__ == "__main__":
    app.run(debug=True)