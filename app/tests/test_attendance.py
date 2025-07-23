from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

# Set a test user credential (must already exist or match the test_register_user)
TEST_USERNAME = "test1"
TEST_PASSWORD = "test123"

def get_token():
    response = client.post(
        "/auth/token",
        data={
            "username": TEST_USERNAME,
            "password": TEST_PASSWORD
        }
    )
    assert response.status_code == 200
    return response.json()["access_token"]

def test_check_in():
    token = get_token()
    response = client.post(
        "/attendance/check-in",
        headers={"Authorization": f"Bearer {token}"}
    )
    print("Check-in response:", response.json())
    assert response.status_code == 200

def test_check_out():
    token = get_token()
    response = client.post(
        "/attendance/check-out",
        headers={"Authorization": f"Bearer {token}"}
    )
    print("Check-out response:", response.json())
    assert response.status_code == 200

def test_view_my_logs():
    token = get_token()
    response = client.get(
        "/attendance/my-logs",
        headers={"Authorization": f"Bearer {token}"}
    )
    print("My logs response:", response.json())
    assert response.status_code == 200
    assert isinstance(response.json(), list)
