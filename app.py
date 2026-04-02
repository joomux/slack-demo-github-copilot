"""
Hello World Flask Application with Claims API
This app has intentional errors for CI/CD demo purposes
"""

from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Sample claims data
claims_data = [
    {"id": 1, "claimant": "John Doe", "amount": 1500.00, "status": "pending"},
    {"id": 2, "claimant": "Jane Smith", "amount": 2300.50, "status": "approved"},
    {"id": 3, "claimant": "Bob Johnson", "amount": 750.00, "status": "denied"}
]


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/claims", methods=["GET"])
def get_claims():
    # Intentional error: undefined variable
    return jsonify({"claims": claims_data, "total": total_count})


@app.route("/api/claims/<int:claim_id>", methods=["GET"])
def get_claim(claim_id):
    # Intentional error: using wrong comparison operator
    for claim in claims_data:
        if claim["id"] = claim_id:  # SyntaxError: invalid syntax (should be ==)
            return jsonify(claim)
    return jsonify({"error": "Claim not found"}), 404


@app.route("/api/claims", methods=["POST"])
def create_claim():
    data = request.get_json()
    
    # Intentional error: missing import for datetime
    new_claim = {
        "id": len(claims_data) + 1,
        "claimant": data["claimant"],
        "amount": data["amount"],
        "status": "pending",
        "created_at": datetime.now().isoformat()
    }
    
    claims_data.append(new_claim)
    return jsonify(new_claim), 201


@app.route("/api/claims/<int:claim_id>", methods=["DELETE"])
def delete_claim(claim_id):
    # Intentional error: variable used before assignment
    for i, claim in enumerate(claims_data):
        if claim["id"] == claim_id:
            deleted = claims_data.pop(i)
            break
    
    # This will fail if claim not found (deleted not defined)
    return jsonify({"message": "Claim deleted", "claim": deleted})


@app.route("/api/health")
def health_check():
    # Intentional error: missing closing parenthesis
    return jsonify({"status": "healthy", "version": "1.0.0"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
