from flask import Flask

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    """A simple API endpoint that returns 'Hello, World!'."""
    return {"message": "Hello, World!"}, 200

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
