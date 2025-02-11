from flask import Flask, jsonify, request, make_response
from flask_socketio import SocketIO, emit
from os import path

index_path = path.abspath("./index.html")
app = Flask(__name__)
socketio = SocketIO(app)

@app.after_request
def add_cors_headers(response):
    # Allow only https://www.twitch.tv
    response.headers.add("Access-Control-Allow-Origin", "https://www.twitch.tv")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route("/", methods=["GET", "OPTIONS"])
def home():
    # Handle preflight request
    if request.method == "OPTIONS":
        response = make_response()
        return response

    # Handle actual request
    with open(index_path, "r") as f:
        return f.read()

@app.route("/highlight", methods=["POST", "OPTIONS"])
def highlight():
    # Handle preflight request
    if request.method == "OPTIONS":
        response = make_response()
        return response

    # Handle actual request
    emit("highlight", request.data, broadcast=True, namespace="/")

    return "Ok"

@app.route("/unhighlight", methods=["POST", "OPTIONS"])
def unhighlight():
    # Handle preflight request
    if request.method == "OPTIONS":
        response = make_response()
        return response

    # Handle actual request
    emit("unhighlight", broadcast=True, namespace="/")

    return "Ok"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3672)
