from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)
nlp = pipeline("text-generation", model="gpt2")

@app.route("/chat", methods=["OPTIONS", "GET", "POST"])
def chat():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200
    elif request.method == "GET":
        return jsonify({"message": "GET request received"}), 200
    elif request.method == "POST":
        user_input = request.json.get("message")
        response = nlp(user_input, max_length=50, num_return_sequences=1)
        return jsonify({"response": response[0]["generated_text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6067)