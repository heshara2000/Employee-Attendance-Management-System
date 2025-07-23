import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Login as admin user
def get_admin_token():
    response = client.post(
        "/auth/token",
        data={"username": "adminuser", "password": "admin123"}
    )
    return response.json().get("access_token")

def test_admin_view_logs():
    token = get_admin_token()
    assert token is not None, "Admin token should not be None"

    response = client.get(
        "/admin/attendance-records",
        headers={"Authorization": f"Bearer {token}"}
    )

    print("Admin log response:", response.json())
    assert response.status_code == 200
    assert isinstance(response.json(), list)
