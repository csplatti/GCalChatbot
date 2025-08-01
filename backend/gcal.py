from flask import Flask
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173"])  # Allow the correct frontend origin

@app.route('/api/hello', methods=['GET'])
def hello_world():
    """A simple API endpoint that returns 'Hello, World!'."""
    return {"message": "Hello, World!"}, 200

if __name__ == "__main__":
    app.run(host="localhost", port=5067)
