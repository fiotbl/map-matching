from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Members API Route
@app.route("/members")
def members():
    return {"members": ["Mem1", "Mem2", "Mem3"]}

@app.route('/result', methods = ['POST'])
def result():
    geopoints = request.json
    if geopoints:
       print(geopoints)
       return jsonify(geopoints)
    
    return "No geopoints receieved"

if __name__ == "__main__":
    app.run(debug=True)