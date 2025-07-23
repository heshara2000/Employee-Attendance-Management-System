from fastapi.testclient import TestClient
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from app.main import app  

client = TestClient(app)


def test_register_user():
    response = client.post(
        "/auth/register",
        data={
            "username": "test1",
            "password": "test123"
        }
    )
    assert response.status_code == 200 or response.status_code == 400
    # 400 if user already exists — depends on your validation
    print("Register Response:", response.json())


def test_login_user():
    response = client.post(
        "/auth/token",
        data={
            "username": "test1",
            "password": "test123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    print("Login Token:", data["access_token"])
