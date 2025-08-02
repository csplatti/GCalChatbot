from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])
nlp = pipeline("text-generation", model="gpt2")

@app.route("/chat", methods=["GET", "POST"])
def chat():
    user_input = request.json.get("message")
    response = nlp(user_input, max_length=50, num_return_sequences=1)
    return jsonify({"response": response[0]["generated_text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6067)