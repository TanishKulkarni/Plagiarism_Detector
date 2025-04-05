from flask import Flask, request, jsonify
from plagiarism_detector import check_plagiarism  # ✅ Correct function
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/check_plagiarism', methods=['POST'])
def check_plagiarism_api():
    data = request.get_json()
    input_text = data.get("input_text", "")
    results = check_plagiarism(input_text)
    return jsonify({'plagiarized_phrases': results})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
