import requests
BASE_URL = "http://localhost:3000"

def login(email: str, password: str):
    response =  requests.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password })
    if response.status_code == 200:
        print("Login successful!")
        return response.json()
    else:
        print("Login failed. Please check your credentials.")

def signup(email: str, password: str, username: str):
    response = requests.post(f"{BASE_URL}/api/auth/register",
                             json={"email": email, "password": password, "username": username})
    if response.status_code == 200:
        print("Signup succesful!")
        return response.json()
    else:
        print("Signup failed. Please try again.")

def profile(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(f"{BASE_URL}/api/auth/profile", headers=headers)
    return (response.json())

def logout(token: str):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.post(f"{BASE_URL}/api/auth/logout", headers=headers)
    if response.status_code == 200:
        print("Logged out...")
        print(response.json())

def link(token, key, secret):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.post(f"{BASE_URL}/api/accounts/link",
                             headers=headers, json={"accountType": "bybit", "apiKey": key,
                                                    "apiSecret": secret})
    if response.status_code == 200:
        print(response.json())
        return response.json()

def get_balance(token, account_type):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {}
    if account_type == "bybit":
        params = {
            "accountType": "bybit",
        }
    response = requests.get(f"{BASE_URL}/api/balance/", headers=headers, params=params)
    if response.status_code == 200:
        print(response.json())
        return response.json()["data"]["balance"]
    else:
        return 0

