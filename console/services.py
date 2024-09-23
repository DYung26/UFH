import requests
BASE_URL = "http://100.26.225.110:3000" # "http://localhost:3000"

def login(email: str, password: str):
    response =  requests.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password })
    if response.status_code == 200:
        print("Login successful!")
        return response.json()
    else:
        print("Login failed. Please check your credentials.\n")

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
        # print(response.json())

def link(token, key, secret, account_type):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.post(f"{BASE_URL}/api/accounts/link",
                             headers=headers, json={"account_type": account_type, "api_key": key,
                                                    "api_secret": secret})
    if response.status_code == 200:
        # print(response.json())
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
    elif account_type == "binance":
        params = {
            "accountType": "binance",
        }
    response = requests.get(f"{BASE_URL}/api/balance/", headers=headers, params=params)
    if response.status_code == 200:
        # print(response.json())
        return response.json()["data"]["balance"]
    else:
        return 0

def get_total_balance(token):
    linked_accounts = get_linked_accounts(token)
    total_balance = 0
    for account in linked_accounts:
        account_type = account["account_type"]
        total_balance += float(get_balance(token, account_type))
    return total_balance

def get_linked_accounts(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(f"{BASE_URL}/api/accounts/linked-accounts", headers=headers)
    if response.status_code == 200:
        # print(response.json())
        return response.json()["data"]
    return []

def get_account_balance(token):
    linked_accounts = get_linked_accounts(token)
    account_balance = [
        [account["account_type"], get_balance(token, account["account_type"])]
        for account in linked_accounts
    ]
    # print(account_balance)
    return account_balance

