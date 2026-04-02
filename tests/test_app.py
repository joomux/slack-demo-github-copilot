"""
Tests for the Claims API
Contains intentional test failures for CI/CD demo
"""

import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_hello_world(client):
    """Test the hello world endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.data == b"Hello, World!"


def test_get_claims(client):
    """Test getting all claims - will fail due to undefined variable"""
    response = client.get("/api/claims")
    assert response.status_code == 200
    data = response.get_json()
    assert "claims" in data


def test_get_single_claim(client):
    """Test getting a single claim - will fail due to syntax error"""
    response = client.get("/api/claims/1")
    assert response.status_code == 200
    data = response.get_json()
    assert data["id"] == 1


def test_create_claim(client):
    """Test creating a new claim - will fail due to missing datetime import"""
    new_claim = {
        "claimant": "Test User",
        "amount": 500.00
    }
    response = client.post("/api/claims", json=new_claim)
    assert response.status_code == 201


def test_delete_claim(client):
    """Test deleting a claim"""
    response = client.delete("/api/claims/1")
    assert response.status_code == 200


def test_health_check(client):
    """Test health check endpoint - will fail due to syntax error"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"


def test_claim_not_found(client):
    """Test 404 for non-existent claim"""
    response = client.get("/api/claims/999")
    assert response.status_code == 404


# Intentional failing test - wrong assertion
def test_claims_count(client):
    """This test will fail - intentionally wrong assertion"""
    response = client.get("/api/claims")
    data = response.get_json()
    # Intentional error: expecting wrong count
    assert len(data["claims"]) == 10  # Actually only 3 claims
